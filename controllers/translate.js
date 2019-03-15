var CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
var defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;
const fs = require('fs')
const googleTranslate = require('google-translate')('AIzaSyBuNW11wBhB_wkBEFE6MnSKT_xeWsgpbuM')

var apiInstance = new CloudmersiveOcrApiClient.PdfOcrApi();
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '1ff25d58-7b9f-460d-a07e-a9c22dd68d2b';

var request = require('request');

module.exports = {
    translate(req, res) {
        console.log(req.body.url)
        
        var options = {
            url: req.body.url,
            method: "get",
            encoding: null
        };

        request(options, function (error, response, body) {

            if (error) {
                console.error('error:', error);
            } else {
                console.log(body, "====");

                console.log('Response: StatusCode:', response && response.statusCode);
                console.log('Response: Body: Length: %d. Is buffer: %s', body.length, (body instanceof Buffer));
                // fs.writeFileSync('test.jpg', body);
                var imageFile = body // File | Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.

                var opts = {
                    'language': "ENG", // String | Optional, language of the input document, default is English (ENG).  Possible values are ENG (English), ARA (Arabic), ZHO (Chinese - Simplified), ZHO-HANT (Chinese - Traditional), ASM (Assamese), AFR (Afrikaans), AMH (Amharic), AZE (Azerbaijani), AZE-CYRL (Azerbaijani - Cyrillic), BEL (Belarusian), BEN (Bengali), BOD (Tibetan), BOS (Bosnian), BUL (Bulgarian), CAT (Catalan; Valencian), CEB (Cebuano), CES (Czech), CHR (Cherokee), CYM (Welsh), DAN (Danish), DEU (German), DZO (Dzongkha), ELL (Greek), ENM (Archaic/Middle English), EPO (Esperanto), EST (Estonian), EUS (Basque), FAS (Persian), FIN (Finnish), FRA (French), FRK (Frankish), FRM (Middle-French), GLE (Irish), GLG (Galician), GRC (Ancient Greek), HAT (Hatian), HEB (Hebrew), HIN (Hindi), HRV (Croatian), HUN (Hungarian), IKU (Inuktitut), IND (Indonesian), ISL (Icelandic), ITA (Italian), ITA-OLD (Old - Italian), JAV (Javanese), JPN (Japanese), KAN (Kannada), KAT (Georgian), KAT-OLD (Old-Georgian), KAZ (Kazakh), KHM (Central Khmer), KIR (Kirghiz), KOR (Korean), KUR (Kurdish), LAO (Lao), LAT (Latin), LAV (Latvian), LIT (Lithuanian), MAL (Malayalam), MAR (Marathi), MKD (Macedonian), MLT (Maltese), MSA (Malay), MYA (Burmese), NEP (Nepali), NLD (Dutch), NOR (Norwegian), ORI (Oriya), PAN (Panjabi), POL (Polish), POR (Portuguese), PUS (Pushto), RON (Romanian), RUS (Russian), SAN (Sanskrit), SIN (Sinhala), SLK (Slovak), SLV (Slovenian), SPA (Spanish), SPA-OLD (Old Spanish), SQI (Albanian), SRP (Serbian), SRP-LAT (Latin Serbian), SWA (Swahili), SWE (Swedish), SYR (Syriac), TAM (Tamil), TEL (Telugu), TGK (Tajik), TGL (Tagalog), THA (Thai), TIR (Tigrinya), TUR (Turkish), UIG (Uighur), UKR (Ukrainian), URD (Urdu), UZB (Uzbek), UZB-CYR (Cyrillic Uzbek), VIE (Vietnamese), YID (Yiddish)
                    'preprocessing': "Auto" // String |tional, preprocessing mode, default is 'Auto'.  Possible values are None (no preprocessing of the image), and Auto (automatic image enhancement of the image before OCR is applied; this is recommended).
                };

                var callback = function (error, data, response) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('API called successfully. Returned data: ' + data.OcrPages[0].TextResult)
                        googleTranslate
                            .translate(data.OcrPages[0].TextResult, 'id', function (err, translation) {
                                if (err) {
                                    res.status(500).json(err)
                                    console.log(err);
                                } else {
                                    res.status(200).json({data : translation.translatedText})
                                    console.log(translation.translatedText);
                                    // console.log();

                                    // res.status(200).json({data :translation.translatedText})
                                }
                            })
                    }
                };
                apiInstance.pdfOcrPost(imageFile, opts, callback)

            }
        });

    }
}