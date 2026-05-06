---
title: "Identify Artemisinin Resistance — Parasite Clearance Half-Life Analysis Tool"
date: 2024-06-01
category: "Research Software"
summary: "An interactive Shiny application for exploring artemisinin resistance using parasite clearance half-life data, helping researchers examine how sensitive and resistant parasite populations may be identified from clearance patterns."
image: "/images/projects/id-artemisinin-resistance.png"
featured: true
tags: ["R", "Shiny", "Malaria", "Artemisinin Resistance", "Modelling"]
app_url: "https://malaria.shinyapps.io/id_artemisinin_resistance/"
github: "https://github.com/MAEMOD-MORU/mixmodelpaperfinal"
---

## Overview

Identify Artemisinin Resistance is an interactive research software tool developed to support the analysis and interpretation of parasite clearance half-life data in malaria research.

The application allows users to explore how artemisinin-sensitive and artemisinin-resistant parasite populations may appear as overlapping distributions of parasite clearance half-life. Through example simulations and user-provided data, the tool helps illustrate the strengths and limitations of using fixed half-life cut-off values to identify suspected artemisinin resistance.

The tool is designed for researchers, modellers, and public health scientists working on malaria treatment response, antimalarial resistance, and parasite clearance analysis.

## Technical Stack

- **Application**: R Shiny
- **Modelling approach**: Mixture model-based analysis of parasite clearance half-life distributions
- **Use case**: Interactive simulation and analysis of artemisinin resistance patterns
- **Source code**: [GitHub repository](https://github.com/MAEMOD-MORU/mixmodelpaperfinal)
- **Live application**: [Launch the Shiny app](https://malaria.shinyapps.io/id_artemisinin_resistance/)

## Key Features

- Interactive examples demonstrating parasite clearance half-life distributions
- Simulation of artemisinin-sensitive and artemisinin-resistant parasite populations
- Support for user-provided half-life data
- Visual comparison of resistance patterns under different assumptions
- Educational explanation of limitations when applying fixed cut-off values

## Impact

This tool supports malaria researchers in understanding and communicating how parasite clearance half-life data can be used to investigate artemisinin resistance. By making the modelling approach available through an interactive web application, the project helps improve transparency, reproducibility, and accessibility in antimalarial resistance research.