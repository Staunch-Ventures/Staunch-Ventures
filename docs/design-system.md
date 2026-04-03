# Staunch Ventures Design System

This document outlines the visual and interaction design specifications for the Staunch Ventures application.

## 1. Visual Theme
- **Theme**: Strictly Dark Mode.
- **Aesthetic**: "Liquid Glass" — characterized by high-quality backdrop blurs, subtle transparency, and vibrant primary accents.

## 2. Color Palette (HSL)
All colors are defined as HSL variables in `src/app/globals.css`.

| Entity | HSL Value | Description |
| :--- | :--- | :--- |
| **Background** | `229 100% 8%` | Deep Midnight Navy |
| **Foreground** | `0 0% 98%` | Off-White Text |
| **Primary** | `16 80% 54%` | Terracotta Orange (Brand) |
| **Accent** | `16 80% 54%` | Same as Primary |
| **Card / Muted** | `229 50% 16%` | Dark Blue-Grey Surface |
| **Border** | `229 50% 25%` | Subtle Separation |

## 3. Typography
- **Primary Font**: `Inter` (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold).
- **Scale**:
  - Hero Titles: `text-5xl` to `text-7xl` (Tracking: `tighter`).
  - Section Headers: `text-4xl`.
  - Body Copy: `text-base` to `text-lg`.

## 4. UI Patterns & "Liquid Glass"
- **Backdrop Blur**: `backdrop-blur-xl` (Standard) or `backdrop-blur-md` (Subtle).
- **Transparency**:
  - Surface Overlays: `bg-white/5`.
  - Active States: `bg-primary/20`.
- **Borders**:
  - Default: `border-white/10`.
  - Active/Primary: `border-primary/30`.
- **Shapes**:
  - Interactive Buttons: `rounded-full` (Oval/Pill).
  - Cards: `rounded-lg` (`0.75rem`).
- **Gradients**:
  - Glass Gradient: `radial-gradient(ellipse 60% 80% at top right, hsla(0, 0%, 100%, 0.2), transparent)`.
  - Primary Glow: `radial-gradient(ellipse 60% 80% at top right, hsl(var(--primary) / 0.25), transparent)`.

## 5. Motion & Interaction
- **Active Indicators**: Sliding ovals using Framer Motion `layoutId`.
- **Entrance**: Scroll-triggered reveal with `y` offset of `24px`.
- **Transitions**: Spring-based physics (`bounce: 0.15`, `duration: 0.6`) for a premium iOS/macOS feel.
