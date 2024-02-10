const fs = require('fs');
const csv = require('csv-parser');

// Define input and output file paths
const inputFilePath = 'input.csv';
const outputFilePath = 'output.csv';

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFilePath);

// Write the header row to the output file
writeStream.write('user_id,timestamp,message_body\n');

// Read the input CSV file and preprocess the rows
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Remove any double quotes from the message_body column
    row.message_body = row.message_body.replace(/"/g, '');
    
    // Write the processed row to the output file
    writeStream.write(`${row.user_id},${row.timestamp},"${row.message_body}"\n`);
  })
  .on('end', () => {
    console.log('CSV file preprocessed successfully!');
  });
