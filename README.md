# Chicken Biryani Recipe Page

This project is a recipe page built to meet accessibility and responsive layout requirements.

## Purpose

The page presents a chicken biryani recipe with:
- a servings control that updates ingredient quantities
- accessible focus states for interactive elements
- keyboard-friendly controls and ordering
- screen-reader announcements when quantities change
- a responsive layout for narrow screens

## Narrow-screen layout

On screens narrower than 760px, the layout switches to a single-column flow. The sections are stacked in the same order they appear in the page.

This keeps the reading and keyboard order consistent with the visual order. The content is constrained to the viewport width so the page stays within the screen without horizontal scrolling at 320px. The controls wrap cleanly and the layout remains readable on small devices.

On wider screens, the ingredients section moves to the left column and the method section stays on the right, making better use of available space while preserving the same logical reading order.