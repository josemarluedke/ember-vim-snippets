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
$0
endsnippet\n\n`;
}
