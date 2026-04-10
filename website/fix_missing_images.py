import os

# Base path for docs
base_dir = r"g:\repogitory\site-docusaurus-docker-study\website\docs\tdd_ts"

# List of (filename, image_filename)
targets = [
    ("tdd_ts_study_016.md", "tdd_ts_study_016_range_compare.png"),
    ("tdd_ts_study_020.md", "tdd_ts_study_020_name_improvement.png"),
    ("tdd_ts_study_039.md", "tdd_ts_study_039_clean_zone.png"),
    ("tdd_ts_study_041.md", "tdd_ts_study_041_dependency_snake.png"),
    ("tdd_ts_study_049.md", "tdd_ts_study_049_fetch_bypass.png"),
    ("tdd_ts_study_051.md", "tdd_ts_study_051_coverage_spotlight.png"),
    ("tdd_ts_study_053.md", "tdd_ts_study_053_test_pyramid.png")
]

for filename, image in targets:
    file_path = os.path.join(base_dir, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    new_lines = []
    modified = False
    for line in lines:
        if image in line and "<!--" not in line:
            # Comment out the line
            new_lines.append(f"<!-- {line.rstrip()} -->\n")
            print(f"Commented out image {image} in {filename}")
            modified = True
        else:
            new_lines.append(line)

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.writelines(new_lines)
    else:
        print(f"No changes for {filename} (Image not found or already commented)")

print("Done.")
