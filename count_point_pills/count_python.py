import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.measure import label, regionprops
from skimage.morphology import disk, erosion
import json

# Load image
pills = cv2.imread('C:/Users/Lola Monroy Mir/OneDrive/Escritorio/AXA_LauzHack/count_point_pills/pill2.jpeg')

# Check if the image was loaded successfully
if pills is None:
    raise FileNotFoundError("The image could not be loaded. Please check the file path.")

pills_rgb = cv2.cvtColor(pills, cv2.COLOR_BGR2RGB)

# Convert to grayscale
pills_gray = cv2.cvtColor(pills, cv2.COLOR_BGR2GRAY)

# Thresholding
threshold = 160
_, pills_bin = cv2.threshold(pills_gray, threshold, 255, cv2.THRESH_BINARY)

# Erosion to separate pills
SE2 = disk(15)
pills_eroded = erosion(pills_bin, SE2)

# Label objects
labeled_image = label(pills_eroded)
regions = regionprops(labeled_image)

# Initialize counters
num_long = 0
num_round = 0
indices_long = []
indices_round = []

# Plot original image to annotate
fig, ax = plt.subplots()
ax.imshow(pills_rgb)

# Classify objects
for i, region in enumerate(regions):
    aspect_ratio = region.major_axis_length / region.minor_axis_length
    eccentricity = region.eccentricity
    centroid = region.centroid

    # Adjust classification criteria
    if eccentricity > 0.7:
        # Long pills
        num_long += 1
        indices_long.append(i)
    else:
        # Round pills
        num_round += 1
        indices_round.append(i)

# Highlight specific pills
# Highlight round pills
point_round = 2  # Number of round pills to highlight
if len(indices_round) >= point_round:
    for i in range(point_round):
        centroid = regions[indices_round[i]].centroid
        minr, minc, maxr, maxc = regions[indices_round[i]].bbox
        rect = plt.Rectangle((minc, minr), maxc - minc, maxr - minr, edgecolor='blue', linewidth=2, fill=False)
        ax.add_patch(rect)

# Highlight long pills
point_long = 1  # Number of long pills to highlight
if len(indices_long) >= point_long:
    centroid = regions[indices_long[0]].centroid
    minr, minc, maxr, maxc = regions[indices_long[0]].bbox
    rect = plt.Rectangle((minc, minr), maxc - minc, maxr - minr, edgecolor='red', linewidth=2, fill=False)
    ax.add_patch(rect)

# Save the annotated image locally
annotated_image_path = 'annotated_pill_image.png'
plt.savefig(annotated_image_path)

# Save results to JSON file
results = {
    'num_long': num_long,
    'num_round': num_round,
    'annotated_image_path': annotated_image_path
}

with open('pill_count_results.json', 'w') as json_file:
    json.dump(results, json_file)

print("Results saved to pill_count_results.json and annotated image saved to annotated_pill_image.png")
