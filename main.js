var fileName;
/* Prompt for input and change the name that the file will save to. */

function rename() {
  var newFileName = prompt("New filename:", "save");
  if (newFileName != null) {
    fileName = newFileName;
    if (fileName.substr(fileName.length - 3) != ".md") {
      fileName += ".md";
    }
    document.getElementById("boxTitle").innerHTML = fileName;
  }
}

/* Renders markdown from the textarea into HTML to display in the div. */

function render() {
  var text = document.getElementById("entryBox").value;
  var converter = new showdown.Converter(
    { simplifiedAutoLink: "true" },
    { ghMentions: "true" },
    { ghMentionsLink: "true" },
    { ghCompatibleHeaderId: "true" },
    { strikethrough: "true" },
    { tasklists: "true" },
    { smoothLivePreview: "true" },
    { openLinksInNewWindow: "true" },
    { emoji: "true" },
    { underline: "true" },
    { metadata: "true" }
  );
  converter.setFlavor("github");
  var target = document.getElementById("outputDiv");
  var result = converter.makeHtml(text);
  target.innerHTML = result;
}

/* Checks for automatic rendering or not. */

function autoRender() {
  if (document.getElementById("autoRenderCheck").checked) render();
}

/* Just saves the text from the textarea into a file on disk. */

function saveEntryBoxToFile() {
  var text = document.getElementById("entryBox").value;
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  if (fileName != null) {
    saveAs(blob, fileName);
  } else saveAs(blob, "save.md");
}

/* Exports the HTML conversion of the markdown to a file on disk. */

function exportToHTML() {
  var text = document.getElementById("entryBox").value;
  var converter = new showdown.Converter();
  var html = converter.makeHtml(text);
  var blob = new Blob([html], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "save.html");
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = (x) => resolve(fr.result);
    fr.readAsText(file);
  });
}

/* Each of these are made to give focus back to the textarea once they're done. */

function saveButtonClicked() {
  saveEntryBoxToFile();
  document.getElementsByTagName("textarea")[0].focus();
}

function exportButtonClicked() {
  exportToHTML();
  document.getElementsByTagName("textarea")[0].focus();
}

/* This is for reading in a file off the disk and putting it into the textarea. */

async function read(input) {
  var text = await readFile(input.files[0]);
  var fileInfo = document.getElementById("loadFile");
  fileName = fileInfo.files.item(0).name;
  document.getElementById("loadFile").value = "";
  document.getElementById("entryBox").value = text;
  document.getElementById("boxTitle").innerHTML = fileName;
  render();
}

/* This enables use to actually use the tab key in the textarea, for easier formatting of the source file. */

document.getElementById("entryBox").addEventListener("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

document.getElementById("editor").addEventListener("keydown", function (e) {
  if (e.key == "s" && (e.ctrlKey || e.metaKey)) {
    /* Saving*/
    e.preventDefault();
    saveButtonClicked();
  }
  if (e.key == "e" && (e.ctrlKey || e.metaKey)) {
    /* Exporting */
    e.preventDefault();
    exportToHTML();
  }
  if (e.key == "o" && (e.ctrlKey || e.metaKey)) {
    /* Opening */
    e.preventDefault();
    document.getElementById("loadFile").click();
  }
  if (e.key == "r" && (e.ctrlKey || e.metaKey)) {
    /* Rendering */
    e.preventDefault();
    render();
  }
  if (e.key == "r" && (e.ctrlKey || e.metaKey) && e.altKey) {
    /* Toggling autorender */
    e.preventDefault();
    document.getElementById("autoRenderCheck").click();
  }
  if (e.key == "b" && (e.ctrlKey || e.metaKey)) {
    /* Bold format */
    e.preventDefault();
    wrapSelectionInSyntax(document.getElementById("entryBox"), "**");
  }
  if (e.key == "i" && (e.ctrlKey || e.metaKey)) {
    /* Italics format */
    e.preventDefault();
    wrapSelectionInSyntax(document.getElementById("entryBox"), "*");
  }
});

function wrapSelectionInSyntax(txtArea, syntax) {
  let currentText = txtArea.value;
  let startPos = txtArea.selectionStart;
  let endPos = txtArea.selectionEnd;
  let textLength = txtArea.value.length;
  if (startPos == endPos) {
    if (
      currentText.substring(startPos - syntax.length, startPos) === syntax &&
      currentText.substring(endPos, endPos + syntax.length) === syntax
    ) {
      txtArea.value =
        currentText.substring(0, startPos - syntax.length) +
        currentText.substring(endPos + syntax.length, textLength);
    } else if (
      currentText.substring(endPos, endPos + syntax.length) === syntax
    ) {
      txtArea.selectionStart = startPos + syntax.length;
      txtArea.selectionEnd = startPos + syntax.length;
    } else {
      txtArea.value =
        currentText.substring(0, startPos) +
        syntax +
        syntax +
        currentText.substring(startPos, textLength);
      txtArea.selectionStart = startPos + syntax.length;
      txtArea.selectionEnd = startPos + syntax.length;
    }
  } else {
    if (
      currentText.substring(startPos - syntax.length, startPos) === syntax &&
      currentText.substring(endPos, endPos + syntax.length) === syntax
    ) {
      txtArea.value =
        currentText.substring(0, startPos - syntax.length) +
        currentText.substring(startPos, endPos) +
        currentText.substring(endPos + syntax.length, textLength);
      txtArea.selectionStart = startPos - syntax.length;
      txtArea.selectionEnd = endPos - syntax.length;
    } else {
      let outputString =
        currentText.substring(0, startPos) +
        syntax +
        currentText.substring(startPos, endPos) +
        syntax +
        currentText.substring(endPos, textLength);
      txtArea.value = outputString;
      txtArea.selectionStart = startPos + syntax.length;
      txtArea.selectionEnd = endPos + syntax.length;
    }
  }
}
