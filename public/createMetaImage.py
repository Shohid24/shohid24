from PIL import Image, ImageDraw, ImageFont, ImageOps
import textwrap

def generate_profile_image(name, description, profile_path, output_path):
    """Generates a profile image with name, description, and profile photo.

    Args:
        name: The name to display.
        description: The description to display.
        profile_path: Path to the profile photo.
        output_path: Path to save the generated image.
    """

    width = 1200
    height = 630
    image = Image.new("RGB", (width, height), color=(255, 255, 255))  # White background
    draw = ImageDraw.Draw(image)

    try:
        # Fonts (adjust paths if needed)
        name_font = ImageFont.truetype("arialbd.ttf", size=48)  # Bold Arial
        description_font = ImageFont.truetype("arial.ttf", size=24)  # Regular Arial
    except FileNotFoundError:
        print("Error: Font files not found. Using default fonts.")
        name_font = ImageFont.load_default()
        description_font = ImageFont.load_default()

    # Name and description area
    text_width_limit = width // 3  # 1/3 of the width
    text_x = 50  # Left padding
    text_y = 50  # Top padding

    # Draw name
    draw.text((text_x, text_y), name, fill=(0, 0, 0), font=name_font)  # Black color
    bbox = name_font.getbbox(name)
    text_y += bbox[3] - bbox[1] + 20  # Add spacing after name (height of text)

    # Draw description (with wrapping)
    wrapped_description = textwrap.wrap(description, width=text_width_limit // description_font.getbbox("a")[2] if description_font else 10) # approximate width per character
    for line in wrapped_description:
        draw.text((text_x, text_y), line, fill=(0, 0, 0), font=description_font)
        bbox = description_font.getbbox(line)
        text_y += bbox[3] - bbox[1] + 5  # Add spacing after each line (height of text)

    # Profile photo
    profile_size = 300  # Diameter of the circle
    profile_x = width - profile_size - 50  # Right padding
    profile_y = (height - profile_size) // 2  # Vertically centered

    try:
        profile_img = Image.open(profile_path).convert("RGBA")  # Ensure RGBA for transparency
        profile_img = profile_img.resize((profile_size, profile_size), Image.LANCZOS)  # Resize before masking
        mask = Image.new("L", (profile_size, profile_size), 0)
        draw_mask = ImageDraw.Draw(mask)
        draw_mask.ellipse((0, 0, profile_size, profile_size), fill=255)  # Create circular mask
        profile_img.putalpha(mask)  # Apply the mask
        image.paste(profile_img, (profile_x, profile_y), profile_img) # Paste using the alpha channel
    except FileNotFoundError:
        print(f"Warning: Profile image not found at {profile_path}. Skipping profile image.")

    image.save(output_path)
    print(f"Image saved to {output_path}")


# Example usage:
name = "John Doe"
description = "This is a sample description. It can be long and wrap to multiple lines. This is a very very long description to test the text wrapping functionality. This is a very very long description to test the text wrapping functionality. This is a very very long description to test the text wrapping functionality."
profile_path = "profile.jpg"  # Replace with your profile photo path
output_path = "profile_image.png"

generate_profile_image(name, description, profile_path, output_path)