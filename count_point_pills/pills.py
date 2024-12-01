import cv2
import numpy as np

def count_and_highlight_pills(reference_image_path, test_image_path, output_image_path):
    # Load the reference and test images
    reference_image = cv2.imread(reference_image_path, cv2.IMREAD_GRAYSCALE)
    test_image = cv2.imread(test_image_path, cv2.IMREAD_GRAYSCALE)
    color_test_image = cv2.imread(test_image_path)

    # Apply GaussianBlur to the test image
    blurred_test_image = cv2.GaussianBlur(test_image, (9, 9), 0)

    # Use Canny edge detection
    edges = cv2.Canny(blurred_test_image, 10, 150)

    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter contours by area
    min_area = 500  # Define a minimum area threshold
    filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > min_area]

    # Draw contours on the original test image
    cv2.drawContours(color_test_image, filtered_contours, -1, (0, 255, 0), 2)

    # Count the number of pills
    number_of_pills = len(filtered_contours)

    # Save the output image
    cv2.imwrite(output_image_path, color_test_image)

    return number_of_pills

reference_image_path = "./count_point_pills/pill_large.jpeg"  # Ruta de la imagen de referencia
test_image_path = "./count_point_pills/pill1.jpeg"          # Ruta de la imagen de prueba
output_image_path = "./count_point_pills/highlighted_pills.jpg" # Ruta de la imagen de salida

# Call the function and print the number of pills
number_of_pills = count_and_highlight_pills(reference_image_path, test_image_path, output_image_path)
print(f"Number of pills: {number_of_pills}")
