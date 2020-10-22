function render() {
    var converter = new showdown.Converter({simplifiedAutoLink: 'true'}, {ghMentions: 'true'}, {ghMentionsLink: 'true'}, {ghCompatibleHeaderId: 'true'}, {strikethrough: 'true'}, {tasklists: 'true'}, {smoothLivePreview: 'true'}, {openLinksInNewWindow: 'true'}, {emoji: 'true'}, {underline: 'true'}, {metadata: 'true'});
    converter.setFlavor('github');
    var text = document.getElementById('entryBox').value,
        target = document.getElementById('outputDiv'),
        html = converter.makeHtml(text);
    target.innerHTML = html;
}

function saveEntryBoxToFile() {
    var text = document.getElementById("entryBox").value;
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "save.md");
}

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

function saveButtonClicked() {
    saveEntryBoxToFile();
    document.getElementsByTagName('textarea')[0].focus();
}

function exportButtonClicked() {
    exportToHTML();
    document.getElementsByTagName('textarea')[0].focus();
}
  
async function read(input) {
    var text = await readFile(input.files[0]);
    document.getElementById("loadButton").value = "";
    document.getElementById("entryBox").value = text; 
}