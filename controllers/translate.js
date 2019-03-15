

const Vision = require('@google-cloud/vision')

module.exports = {
    translate(req, res) {
        
        const googleTranslate = require('google-translate')('AIzaSyBuNW11wBhB_wkBEFE6MnSKT_xeWsgpbuM')

        googleVision = async () => {
            try {
                
                const client = new Vision.ImageAnnotatorClient({
                    projectId: 'mini-wp-storage-multer',
                    keyFilename: './rare-nectar-231603-6f69f805285c.json'
                })
                const [result] = await client.textDetection('https://storage.googleapis.com/pdfbox.cloudeyeglobal.com/1552568679561image.jpg')
                // res.json(result);
                const data = result.textAnnotations[0].description
                // console.log(result,"==========");
                
                googleTranslate
                    .translate(data, 'id', function (err, translation) {
                        if (err) {
                            res.status(500).json(err)
                        } else {
                            console.log(translation.translatedText);
                            
                            res.status(200).json({ data: translation.translatedText })
                        }
                    })
            } catch (err) {
                console.log(err);
            }

        }
        googleVision()
    }
}

