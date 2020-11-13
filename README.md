# Welcome to the HighMark text editor!

## Overview

This is a text editor I wrote for my ICS2O0 summative assignment. It's a Markdown editor that can:

- Edit Markdown files with a live preview
- Save and open Markdown files to disk
- Export Markdown files to HTML on disk

It's got some neat features that make it a little more convenient to use:

- Support for checklists
- Syntax shortcuts
	- For example: `CTRL-B` for strong (bold) formatting
	- These shortcuts can add or remove formatting symbols in a relatively intuitive way

When navigating the repository:

- `css`
	- `style.css`: the stylesheet for the editor.
- `index.html`: the HTML file that defines the textareas and buttons stuff.
- `index.js`: this is a skeleton JS file for running HighMark in Electron. You can ignore this file if you are just running it through the browser.
- `main.js`: this is the main JS file with all of the saving/opening, rendering, exporting, shortcuts and the like.