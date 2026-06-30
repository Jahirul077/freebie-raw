import os
import re

react_src = r"c:\Johirul_Islam\JOHIRUL\PixelPioneers\freebie\src"
raw_dest = r"c:\Johirul_Islam\JOHIRUL\PixelPioneers\freebie-raw"

# Let's extract the SVG contents from the JSX files
svg_dir = os.path.join(react_src, "components", "SVG")
svg_files = [
    "CirclesIcon1SVG.jsx",
    "GiftSVG.jsx",
    "GradientRingSVG.jsx",
    "LockSVG.jsx",
    "Star2SVG.jsx",
    "Star3SVG.jsx",
    "Star4SVG.jsx",
    "StarSVG.jsx",
    "UnlockSVG.jsx"
]

svg_contents = {}

def clean_svg_jsx(content):
    # Find the return statement containing the SVG
    match = re.search(r"return\s*\(\s*(<svg.*?</svg>)\s*\)", content, re.DOTALL)
    if not match:
        # Check without parenthesis
        match = re.search(r"return\s*(<svg.*?</svg>)", content, re.DOTALL)
    
    if not match:
        # Check const GiftSVG = (props) => ( <svg... )
        match = re.search(r"\(\s*(<svg.*?</svg>)\s*\)", content, re.DOTALL)
        
    if not match:
        return ""
        
    svg = match.group(1)
    
    # Replace React attributes
    svg = svg.replace("className={className}", 'class="{className}"')
    svg = svg.replace("className={props.className}", 'class="{className}"')
    svg = svg.replace("className", "class")
    svg = svg.replace("strokeWidth", "stroke-width")
    svg = svg.replace("strokeLinecap", "stroke-linecap")
    svg = svg.replace("strokeLinejoin", "stroke-linejoin")
    svg = svg.replace("fillRule", "fill-rule")
    svg = svg.replace("clipRule", "clip-rule")
    svg = svg.replace("xlinkHref", "href")
    svg = svg.replace("xmlnsXlink", "xmlns:xlink")
    svg = re.sub(r"\{\.\.\.props\}", "", svg)
    svg = re.sub(r"\{\.\.\.props\}", "", svg)
    
    return svg

for f in svg_files:
    path = os.path.join(svg_dir, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()
        cleaned = clean_svg_jsx(content)
        svg_contents[f.replace(".jsx", "")] = cleaned

# Write extracted SVGs to a python file or JS file
with open(os.path.join(raw_dest, "extracted_svgs.py"), "w", encoding="utf-8") as out:
    out.write("svgs = {\n")
    for name, svg in svg_contents.items():
        out.write(f"    '{name}': {repr(svg)},\n")
    out.write("}\n")

print("SVGs extracted successfully!")
