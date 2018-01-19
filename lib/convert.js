// Used the project github.com/mattmcmanus/atom-ember-snippets to get
// the snippets.
// From that project I converted to vscode snippets format using github.com/binaryoung/convert-atom-snippets-to-vscode
// and from there I generete UltiSnips.

const path = require('path');
const fs = require('fs');
const files = fs.readdirSync('./converted');

files.forEach(file => {
  if (file.includes('import')) {
    convertFile(file);
  }
});

function convertFile(file) {
  console.log('converting', file);
  let content = fs.readFileSync(path.join('.', 'converted', file), 'utf8');
  let json = JSON.parse(content);
  let stream = fs.createWriteStream(
    `./UltiSnips/javascript/${file.replace('.json', '')}.snippets`
  );

  stream.once('open', function(fd) {
    Object.keys(json).forEach(key => {
      stream.write(generateSnippet(json[key]));
    });
    stream.end();
  });
}

function generateSnippet(obj) {
  return `snippet ${obj.prefix} "import ${obj.description}"
${obj.body}
endsnippet\n\n`;
}
