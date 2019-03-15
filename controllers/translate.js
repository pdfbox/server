const vision = require('@google-cloud/vision')

module.exports = {
  async translate(req, res) {
    const dataURL = req.body.url.split('/');
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
      // projectId: 'mini-wp-storage-multer',
      keyFilename: './cloudeyeglobal-1538876525480-147bb0f485f9.json'
    });
    const bucketName = 'pdfbox.cloudeyeglobal.com';
    const fileName = dataURL[dataURL.length - 1];

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
// Bucket where the file resides
// const bucketName = 'my-bucket';
// Path to PDF file within bucket
// const fileName = 'path/to/document.pdf';

    const gcsSourceUri = `gs://${bucketName}/${fileName}`;
    const gcsDestinationUri = `gs://${bucketName}/${fileName}.json`;

    const inputConfig = {
      // Supported mime_types are: 'application/pdf' and 'image/tiff'
      mimeType: 'application/pdf',
      gcsSource: {
        uri: gcsSourceUri,
      },
    };
    const outputConfig = {
      gcsDestination: {
        uri: gcsDestinationUri,
      },
    };
    const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
    const request = {
      requests: [
        {
          inputConfig: inputConfig,
          features: features,
          outputConfig: outputConfig,
        },
      ],
    };

    const [operation] = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation.promise();
    console.log(filesResponse.responses[0].fullTextAnnotation);
    const destinationUri =
      filesResponse.responses[0].outputConfig.gcsDestination.uri;
    res.json({
      url: `https://storage.googleapis.com/${destinationUri.replace('gs://', '')}output-1-to-2.json`
    })
  },
  translateX(req, res) {
    const googleTranslate = require('google-translate')('AIzaSyBuNW11wBhB_wkBEFE6MnSKT_xeWsgpbuM');
    console.log(req.body)
    try {
      googleTranslate
        .translate(req.body.text, 'en',
          function (err, translation) {
            if (err) {
              res.status(500).json(err)
            } else {
              console.log(translation.translatedText);

              res.status(200).json({data: translation.translatedText})
            }
          })
    } catch (err) {
      console.log(err);
    }

  }
}

