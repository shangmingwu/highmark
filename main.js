var fileName = "";

/* Renders markdown from the textarea into HTML to display in the div. */

function render() {
    var converter = new showdown.Converter({simplifiedAutoLink: 'true'}, {ghMentions: 'true'}, {ghMentionsLink: 'true'}, {ghCompatibleHeaderId: 'true'}, {strikethrough: 'true'}, {tasklists: 'true'}, {smoothLivePreview: 'true'}, {openLinksInNewWindow: 'true'}, {emoji: 'true'}, {underline: 'true'}, {metadata: 'true'});
    converter.setFlavor('github');
    var text = document.getElementById('entryBox').value,
        target = document.getElementById('outputDiv'),
        html = converter.makeHtml(text);
    target.innerHTML = html;
}

/* Just saves the text from the textarea into a file on disk. */

function saveEntryBoxToFile() {
    var text = document.getElementById("entryBox").value;
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
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
      fr.onload = x=> resolve(fr.result);
      fr.readAsText(file);
  })}

/* Each of these are made to give focus back to the textarea once they're done. */

function saveButtonClicked() {
    saveEntryBoxToFile();
    document.getElementsByTagName('textarea')[0].focus();
}

function exportButtonClicked() {
    exportToHTML();
    document.getElementsByTagName('textarea')[0].focus();
}

/* This is for reading in a file off the disk and putting it into the textarea. */

async function read(input) {
    var text = await readFile(input.files[0]);
    var fileInfo = document.getElementById("loadButton");
    fileName = fileInfo.files.item(0).name;
    document.getElementById("loadButton").value = "";
    document.getElementById("entryBox").value = text;
    document.getElementById("boxTitle").innerHTML = fileName;
    render();
}

/* This enables use to actually use the tab key in the textarea, for easier formatting of the source file. */

document.getElementById('entryBox').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });
