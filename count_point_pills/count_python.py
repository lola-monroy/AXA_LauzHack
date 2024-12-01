import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.measure import label, regionprops
from skimage.morphology import disk, erosion

pills = cv2.imread('C:/Users/Lola Monroy Mir/OneDrive/Escritorio/AXA_LauzHack/count_point_pills/pill2.jpeg')

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
        ax.plot(centroid[1], centroid[0], 'r*', markersize=10)  # Mark in red
    else:
        # Round pills
        num_round += 1
        indices_round.append(i)
        ax.plot(centroid[1], centroid[0], 'g*', markersize=10)  # Mark in green

plt.show()

print(f'Number of long pills: {num_long}') # ESTE VALOR TIENE QUE SALIR
print(f'Number of round pills: {num_round}') # ESTE VALOR TIENE QUE SALIR

# Highlight specific pills
fig, ax = plt.subplots()
ax.imshow(pills_rgb)

# Highlight round pills
point_round = 2  # Number of round pills to highlight
if len(indices_round) < point_round:
    print(f'Error: {point_round} round pills are required, but only {len(indices_round)} were found.')
else:
    for i in range(point_round):
        centroid = regions[indices_round[i]].centroid
        minr, minc, maxr, maxc = regions[indices_round[i]].bbox
        rect = plt.Rectangle((minc, minr), maxc - minc, maxr - minr, edgecolor='blue', linewidth=2, fill=False)
        ax.add_patch(rect)
        ax.plot(centroid[1], centroid[0], 'bo', markersize=15)  # Highlight in blue

# Highlight long pills
point_long = 1  # Number of long pills to highlight
if len(indices_long) < point_long:
    print(f'Error: {point_long} long pill is required, but only {len(indices_long)} were found.')
else:
    centroid = regions[indices_long[0]].centroid
    minr, minc, maxr, maxc = regions[indices_long[0]].bbox
    rect = plt.Rectangle((minc, minr), maxc - minc, maxr - minr, edgecolor='red', linewidth=2, fill=False)
    ax.add_patch(rect)
    ax.plot(centroid[1], centroid[0], 'yo', markersize=15)  # Highlight in yellow

plt.show()