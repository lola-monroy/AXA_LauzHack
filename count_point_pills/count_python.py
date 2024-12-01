import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.measure import label, regionprops
from skimage.morphology import disk, erosion
import json
from datetime import datetime

pills = cv2.imread('./count_point_pills/pill2.jpeg')

if pills is None:
    raise FileNotFoundError("The image could not be loaded. Please check the file path.")

pills_rgb = cv2.cvtColor(pills, cv2.COLOR_BGR2RGB)

pills_gray = cv2.cvtColor(pills, cv2.COLOR_BGR2GRAY)

threshold = 160
_, pills_bin = cv2.threshold(pills_gray, threshold, 255, cv2.THRESH_BINARY)

SE2 = disk(15)
pills_eroded = erosion(pills_bin, SE2)

labeled_image = label(pills_eroded)
regions = regionprops(labeled_image)

num_long = 0
num_round = 0
indices_long = []
indices_round = []

fig, ax = plt.subplots()
ax.imshow(pills_rgb)

for i, region in enumerate(regions):
    aspect_ratio = region.major_axis_length / region.minor_axis_length
    eccentricity = region.eccentricity
    centroid = region.centroid

    if eccentricity > 0.7:
        num_long += 1
        indices_long.append(i)
    else:
        num_round += 1
        indices_round.append(i)

day_of_week = datetime.now().strftime('%A')

schedule = {
    'Monday': {'point_round': 2, 'point_long': 1},
    'Tuesday': {'point_round': 3, 'point_long': 2},
    'Wednesday': {'point_round': 2, 'point_long': 4},
    'Thursday': {'point_round': 3, 'point_long': 1},
    'Friday': {'point_round': 2, 'point_long': 3},
    'Saturday': {'point_round': 3, 'point_long': 0},
    'Sunday': {'point_round': 1, 'point_long': 2}
}

point_round = schedule[day_of_week]['point_round']
point_long = schedule[day_of_week]['point_long']

if len(indices_round) >= point_round:
    for i in range(point_round):
        centroid = regions[indices_round[i]].centroid
        minr, minc, maxr, maxc = regions[indices_round[i]].bbox
        rect = plt.Rectangle((minc, minr), maxc - minc, maxr - minr, edgecolor='blue', linewidth=2, fill=False)
        ax.add_patch(rect)

if len(indices_long) >= point_long:
    for i in range(point_long):
        centroid = regions[indices_long[i]].centroid
        minr, minc, maxr, maxc = regions[indices_long[i]].bbox
        rect = plt.Rectangle((minc, minr), maxc - minc, maxr - minr, edgecolor='red', linewidth=2, fill=False)
        ax.add_patch(rect)

annotated_image_path = 'annotated_pill_image.png'
plt.savefig(annotated_image_path)

results = {
    'num_long': num_long,
    'num_round': num_round,
    'annotated_image_path': annotated_image_path
}

with open('pill_count_results.json', 'w') as json_file:
    json.dump(results, json_file)

print("Results saved to pill_count_results.json and annotated image saved to annotated_pill_image.png")
