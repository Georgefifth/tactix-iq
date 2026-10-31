import urllib.request
import json
import os
import math

CACHE_DIR = "/tmp/sb_events"
os.makedirs(CACHE_DIR, exist_ok=True)

TARGET_TEAMS = [
    "Spain",
    "England",
    "Germany",
    "France",
    "Netherlands",
    "Portugal",
    "Italy",
    "Switzerland"
]

ZONE_CONFIG = [
    # Defensive Third (x: 0..40)
    {"id": 1, "name": "Defensive Left Wing", "third": "defensive", "lane": "left-wing", "x": [0, 40], "y": [0, 18]},
    {"id": 2, "name": "Defensive Left Half-Space", "third": "defensive", "lane": "left-halfspace", "x": [0, 40], "y": [18, 30]},
    {"id": 3, "name": "Defensive Central Left", "third": "defensive", "lane": "central-left", "x": [0, 40], "y": [30, 40]},
    {"id": 4, "name": "Defensive Central Right", "third": "defensive", "lane": "central-right", "x": [0, 40], "y": [40, 50]},
    {"id": 5, "name": "Defensive Right Half-Space", "third": "defensive", "lane": "right-halfspace", "x": [0, 40], "y": [50, 62]},
    {"id": 6, "name": "Defensive Right Wing", "third": "defensive", "lane": "right-wing", "x": [0, 40], "y": [62, 80]},

    # Middle Third (x: 40..80)
    {"id": 7, "name": "Middle Left Wing", "third": "middle", "lane": "left-wing", "x": [40, 80], "y": [0, 18]},
    {"id": 8, "name": "Middle Left Half-Space", "third": "middle", "lane": "left-halfspace", "x": [40, 80], "y": [18, 30]},
    {"id": 9, "name": "Middle Central Left", "third": "middle", "lane": "central-left", "x": [40, 80], "y": [30, 40]},
    {"id": 10, "name": "Middle Central Right", "third": "middle", "lane": "central-right", "x": [40, 80], "y": [40, 50]},
    {"id": 11, "name": "Middle Right Half-Space", "third": "middle", "lane": "right-halfspace", "x": [40, 80], "y": [50, 62]},
    {"id": 12, "name": "Middle Right Wing", "third": "middle", "lane": "right-wing", "x": [40, 80], "y": [62, 80]},

    # Attacking Third (x: 80..120)
    {"id": 13, "name": "Attacking Left Wing", "third": "attacking", "lane": "left-wing", "x": [80, 120], "y": [0, 18]},
    {"id": 14, "name": "Attacking Left Half-Space", "third": "attacking", "lane": "left-halfspace", "x": [80, 120], "y": [18, 30]},
    {"id": 15, "name": "Attacking Central Left", "third": "attacking", "lane": "central-left", "x": [80, 120], "y": [30, 40]},
    {"id": 16, "name": "Attacking Central Right", "third": "attacking", "lane": "central-right", "x": [80, 120], "y": [40, 50]},
    {"id": 17, "name": "Attacking Right Half-Space", "third": "attacking", "lane": "right-halfspace", "x": [80, 120], "y": [50, 62]},
    {"id": 18, "name": "Attacking Right Wing", "third": "attacking", "lane": "right-wing", "x": [80, 120], "y": [62, 80]},
]

def get_zone_id(x, y):
    for z in ZONE_CONFIG:
        if z["x"][0] <= x <= z["x"][1] and z["y"][0] <= y <= z["y"][1]:
            return z["id"]
    # Fallback clamp
    cx = max(0, min(120, x))
    cy = max(0, min(80, y))
    for z in ZONE_CONFIG:
        if z["x"][0] <= cx <= z["x"][1] and z["y"][0] <= cy <= z["y"][1]:
            return z["id"]
    return 10

def load_json(url, cache_file):
    if os.path.exists(cache_file):
        with open(cache_file, "r", encoding="utf-8") as f:
            return json.load(f)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump(data, f)
    return data

def main():
    print("Fetching Euro 2024 match list...")
    matches_url = "https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/55/282.json"
    matches = load_json(matches_url, os.path.join(CACHE_DIR, "matches_euro2024.json"))

    team_matches = {t: [] for t in TARGET_TEAMS}
    for m in matches:
        h = m["home_team"]["home_team_name"]
        a = m["away_team"]["away_team_name"]
        for t in TARGET_TEAMS:
            if h == t or a == t:
                team_matches[t].append(m)

    team_data = {}

    for team_name in TARGET_TEAMS:
        t_matches = team_matches[team_name]
        print(f"Processing {team_name} ({len(t_matches)} matches)...")

        # Accumulators
        zone_stats = {
            z["id"]: {
                "id": z["id"],
                "name": z["name"],
                "third": z["third"],
                "lane": z["lane"],
                "xRange": z["x"],
                "yRange": z["y"],
                "turnoverCount": 0,
                "dispossessedCount": 0,
                "miscontrolCount": 0,
                "misplacedPassCount": 0,
                "concededShots": 0,
                "concededXg": 0.0,
                "playerTurnovers": {},
                "vectors": []
            }
            for z in ZONE_CONFIG
        }

        player_press_stats = {}
        total_time_to_conceded_shot = []

        for m in t_matches:
            match_id = m["match_id"]
            events_url = f"https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/{match_id}.json"
            cache_file = os.path.join(CACHE_DIR, f"event_{match_id}.json")
            events = load_json(events_url, cache_file)

            # Sort events by period and timestamp
            events.sort(key=lambda e: (e.get("period", 1), e.get("timestamp", "00:00:00.000")))

            for i, e in enumerate(events):
                event_type = e.get("type", {}).get("name")
                event_team = e.get("team", {}).get("name")
                player = e.get("player", {}).get("name")
                position = e.get("position", {}).get("name", "Player")

                # Track Player Press Resistance
                if event_team == team_name and player:
                    if player not in player_press_stats:
                        player_press_stats[player] = {
                            "name": player,
                            "position": position,
                            "pressuresFaced": 0,
                            "successfulActionsUnderPressure": 0,
                            "turnoversUnderPressure": 0,
                            "progressiveYards": 0.0
                        }

                    is_under_pressure = bool(e.get("under_pressure"))
                    if is_under_pressure:
                        player_press_stats[player]["pressuresFaced"] += 1
                        
                        # Check pass outcome
                        if event_type == "Pass":
                            outcome = e.get("pass", {}).get("outcome")
                            loc = e.get("location", [0, 0])
                            end_loc = e.get("pass", {}).get("end_location", loc)
                            if outcome is None:
                                player_press_stats[player]["successfulActionsUnderPressure"] += 1
                                # forward progression
                                prog = max(0.0, end_loc[0] - loc[0])
                                player_press_stats[player]["progressiveYards"] += prog
                            else:
                                player_press_stats[player]["turnoversUnderPressure"] += 1
                        elif event_type in ["Carry", "Dribble"]:
                            player_press_stats[player]["successfulActionsUnderPressure"] += 1
                        elif event_type in ["Dispossessed", "Miscontrol"]:
                            player_press_stats[player]["turnoversUnderPressure"] += 1

                # Track Turnovers
                if event_team == team_name:
                    is_turnover = False
                    turnover_sub_type = None

                    if event_type == "Dispossessed":
                        is_turnover = True
                        turnover_sub_type = "dispossessed"
                    elif event_type == "Miscontrol":
                        is_turnover = True
                        turnover_sub_type = "miscontrol"
                    elif event_type == "Pass":
                        outcome = e.get("pass", {}).get("outcome", {}).get("name") if e.get("pass", {}).get("outcome") else None
                        if outcome in ["Incomplete", "Out", "Pass Offside"]:
                            is_turnover = True
                            turnover_sub_type = "misplaced_pass"

                    if is_turnover and "location" in e:
                        loc = e["location"]
                        zid = get_zone_id(loc[0], loc[1])
                        z = zone_stats[zid]
                        z["turnoverCount"] += 1

                        if turnover_sub_type == "dispossessed":
                            z["dispossessedCount"] += 1
                        elif turnover_sub_type == "miscontrol":
                            z["miscontrolCount"] += 1
                        elif turnover_sub_type == "misplaced_pass":
                            z["misplacedPassCount"] += 1

                        # Track player turnover in zone
                        pname = player or "Team"
                        if pname not in z["playerTurnovers"]:
                            z["playerTurnovers"][pname] = {"count": 0, "concededXg": 0.0, "position": position}
                        z["playerTurnovers"][pname]["count"] += 1

                        # Look forward in events for opponent transition shot within 15 seconds
                        # Period and time in seconds
                        minute = e.get("minute", 0)
                        second = e.get("second", 0)
                        period = e.get("period", 1)
                        t_sec = minute * 60 + second

                        shot_conceded = False
                        shot_xg = 0.0

                        for j in range(i + 1, min(i + 35, len(events))):
                            nxt = events[j]
                            if nxt.get("period") != period:
                                break
                            nxt_t = nxt.get("minute", 0) * 60 + nxt.get("second", 0)
                            if nxt_t - t_sec > 15:
                                break
                            if nxt.get("team", {}).get("name") != team_name and nxt.get("type", {}).get("name") == "Shot":
                                shot_conceded = True
                                shot_xg = float(nxt.get("shot", {}).get("statsbomb_xg", 0.08))
                                total_time_to_conceded_shot.append(nxt_t - t_sec)
                                break

                        if shot_conceded:
                            z["concededShots"] += 1
                            z["concededXg"] += shot_xg
                            z["playerTurnovers"][pname]["concededXg"] += shot_xg

                        # Vector representation
                        end_x = loc[0] + 5.0
                        end_y = loc[1]
                        if event_type == "Pass" and "end_location" in e.get("pass", {}):
                            end_x = e["pass"]["end_location"][0]
                            end_y = e["pass"]["end_location"][1]

                        if len(z["vectors"]) < 8:
                            z["vectors"].append({
                                "startX": round(loc[0], 1),
                                "startY": round(loc[1], 1),
                                "endX": round(end_x, 1),
                                "endY": round(end_y, 1),
                                "player": pname,
                                "minute": minute,
                                "outcome": turnover_sub_type,
                                "isConcededShot": shot_conceded
                            })

        # Finalize Zones
        match_count = max(1, len(t_matches))
        total_team_turnovers = sum(z["turnoverCount"] for z in zone_stats.values())
        def_to = sum(z["turnoverCount"] for z in zone_stats.values() if z["third"] == "defensive")
        mid_to = sum(z["turnoverCount"] for z in zone_stats.values() if z["third"] == "middle")
        total_conceded_xg = sum(z["concededXg"] for z in zone_stats.values())

        # Pitch Danger Index (PDI) calculation
        # Normalized formula based on turnover frequency and conceded xG
        final_zones = {}
        max_danger_raw = 0.001
        raw_dangers = {}

        for zid, z in zone_stats.items():
            to_p90 = z["turnoverCount"] / match_count
            xg_p90 = z["concededXg"] / match_count
            multiplier = 2.0 if z["third"] == "defensive" else (1.3 if z["third"] == "middle" else 0.6)
            raw_danger = (to_p90 * 1.5 + xg_p90 * 12.0) * multiplier
            raw_dangers[zid] = raw_danger
            if raw_danger > max_danger_raw:
                max_danger_raw = raw_danger

        for zid, z in zone_stats.items():
            pdi = round((raw_dangers[zid] / max_danger_raw) * 100, 1)
            # sort key turnover players
            sorted_players = sorted(
                [
                    {"name": k, "position": v["position"], "count": v["count"], "concededXg": round(v["concededXg"], 2)}
                    for k, v in z["playerTurnovers"].items()
                ],
                key=lambda x: (x["concededXg"], x["count"]),
                reverse=True
            )[:5]

            final_zones[zid] = {
                "id": zid,
                "name": z["name"],
                "third": z["third"],
                "lane": z["lane"],
                "xRange": z["xRange"],
                "yRange": z["yRange"],
                "turnoverCount": z["turnoverCount"],
                "turnoversPer90": round(z["turnoverCount"] / match_count, 1),
                "concededShotsWithin15s": z["concededShots"],
                "concededXgWithin15s": round(z["concededXg"], 2),
                "pitchDangerIndex": pdi,
                "dispossessedCount": z["dispossessedCount"],
                "miscontrolCount": z["miscontrolCount"],
                "misplacedPassCount": z["misplacedPassCount"],
                "keyTurnoverPlayers": sorted_players,
                "recentTurnoverVectors": z["vectors"]
            }

        # Finalize Players
        player_profiles = []
        for p, s in player_press_stats.items():
            if s["pressuresFaced"] >= 8: # Filter low sample size
                esc_rate = round((s["successfulActionsUnderPressure"] / max(1, s["pressuresFaced"])) * 100, 1)
                
                if s["pressuresFaced"] >= 25 and esc_rate >= 82.0:
                    cls = "Press-Resistant Engine"
                elif esc_rate >= 76.0:
                    cls = "Composed Distributor"
                elif esc_rate < 72.0 and s["pressuresFaced"] >= 15:
                    cls = "Press Vulnerability"
                else:
                    cls = "Contested Target"

                player_profiles.append({
                    "id": p.lower().replace(" ", "-"),
                    "name": p,
                    "position": s["position"],
                    "pressuresFaced": s["pressuresFaced"],
                    "pressEscapeRate": esc_rate,
                    "turnoversUnderPressure": s["turnoversUnderPressure"],
                    "progressiveYardsUnderPressure": round(s["progressiveYards"], 1),
                    "sampleSize": s["pressuresFaced"],
                    "classification": cls
                })

        player_profiles.sort(key=lambda p: p["pressuresFaced"], reverse=True)

        # Tactical Triggers
        # Find zone with highest danger in def/mid
        high_risk_zones = sorted(
            [z for z in final_zones.values() if z["third"] in ["defensive", "middle"]],
            key=lambda x: x["pitchDangerIndex"],
            reverse=True
        )
        top_risk_zone = high_risk_zones[0] if high_risk_zones else list(final_zones.values())[0]

        # Find most pressured vulnerable player
        vulnerable_players = [p for p in player_profiles if p["classification"] == "Press Vulnerability"]
        top_vuln_player = vulnerable_players[0]["name"] if vulnerable_players else (player_profiles[-1]["name"] if player_profiles else "Opposition Pivot")

        avg_time = round(sum(total_time_to_conceded_shot) / max(1, len(total_time_to_conceded_shot)), 1) if total_time_to_conceded_shot else 8.5

        tactical_triggers = [
            {
                "id": "trig-1",
                "title": f"Primary Press Trap: {top_risk_zone['name']}",
                "triggerZone": top_risk_zone["name"],
                "zoneId": top_risk_zone["id"],
                "targetPlayer": top_risk_zone["keyTurnoverPlayers"][0]["name"] if top_risk_zone["keyTurnoverPlayers"] else "Opponent Backline",
                "instruction": f"Force build-up into {top_risk_zone['name']} (Zone {top_risk_zone['id']}). Collapse with a 2-man double team as soon as pass travels backward.",
                "evidenceStat": f"Zone PDI: {top_risk_zone['pitchDangerIndex']}/100, {top_risk_zone['turnoverCount']} turnovers resulting in {top_risk_zone['concededShotsWithin15s']} shots conceded within 15s.",
                "priority": "CRITICAL"
            },
            {
                "id": "trig-2",
                "title": f"Press Target Isolation: {top_vuln_player}",
                "triggerZone": "Defensive / Middle Pivot",
                "zoneId": top_risk_zone["id"],
                "targetPlayer": top_vuln_player,
                "instruction": f"Cut passing lanes to press-resistant pivots, funnel ball toward {top_vuln_player}. Apply immediate counter-press upon first touch.",
                "evidenceStat": f"Press Escape Rate drops to sub-benchmark levels under sustained pressure ({len(vulnerable_players)} critical turnovers logged).",
                "priority": "HIGH"
            },
            {
                "id": "trig-3",
                "title": "Transition Blitz Window",
                "triggerZone": "Central Transition Channel",
                "zoneId": 9,
                "targetPlayer": "Attacking Transition Line",
                "instruction": f"Direct vertical strike into half-spaces within {avg_time} seconds of turnover recovery before rest-defense re-organizes.",
                "evidenceStat": f"Average opponent time-to-shot after recovering turnover is {avg_time} seconds.",
                "priority": "MODERATE"
            }
        ]

        total_pf = sum(p["pressuresFaced"] for p in player_profiles)
        total_esc = sum(p["pressEscapeRate"] * p["pressuresFaced"] for p in player_profiles)
        overall_escape = round(total_esc / max(1, total_pf), 1)

        team_data[team_name] = {
            "id": team_name.lower().replace(" ", "-"),
            "name": team_name,
            "code": team_name[:3].upper(),
            "tournament": "UEFA Euro 2024",
            "matchesPlayed": match_count,
            "totalTurnovers": total_team_turnovers,
            "turnoversPerMatch": round(total_team_turnovers / match_count, 1),
            "defensiveThirdTurnovers": def_to,
            "middleThirdTurnovers": mid_to,
            "concededXgPostTurnover": round(total_conceded_xg, 2),
            "overallPressEscapeRate": overall_escape,
            "avgTimeToConcededShotSec": avg_time,
            "zones": final_zones,
            "players": player_profiles[:18],
            "tacticalTriggers": tactical_triggers
        }

    os.makedirs("src/data", exist_ok=True)
    out_file = "src/data/tactixData.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(team_data, f, indent=2)

    print(f"Successfully processed {len(team_data)} teams to {out_file}!")
    for t, d in team_data.items():
        print(f"- {t}: {d['matchesPlayed']} matches, {d['totalTurnovers']} turnovers, overall escape rate {d['overallPressEscapeRate']}%, {len(d['players'])} players profiled")

if __name__ == "__main__":
    main()
