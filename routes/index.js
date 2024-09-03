var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

function getYoutubeVideoId(url) {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
}
router.get('/proxy', async (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).send('URL parameter is required');
    }

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Ghi nhật ký phản hồi
        console.log(`Fetched image with status: ${response.status}`);

        const contentType = response.headers['content-type'];
        res.set('Content-Type', contentType);
        res.send(response.data);
    } catch (error) {
        // Ghi nhật ký lỗi
        console.error('Error fetching image:', error.message);

        // Ghi nhật ký chi tiết lỗi (nếu cần thiết)
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }

        res.status(500).send('Error fetching image');
    }
});


router.get('/download-thumbnail', function (req, res, next) {
    try {
        const {url} = req.query;
        const idVideo = getYoutubeVideoId(url)
        console.log(idVideo)
        // https://i.ytimg.com/vi/<video-id>/<size>.jpg
        //     https://i.ytimg.com/vi_webp/<video-id>/<size>.webp
        const thumbDefaultJpg = `https://i.ytimg.com/vi/${idVideo}/default.jpg`
        const thumbMqDefaultJpg = `https://i.ytimg.com/vi/${idVideo}/mqdefault.jpg`
        const thumbDqDefaultJpg = `https://i.ytimg.com/vi/${idVideo}/hqdefault.jpg`
        const thumbSdDefaultJpg = `https://i.ytimg.com/vi/${idVideo}/sddefault.jpg`
        const thumbMaxResDefaultJpg = `https://i.ytimg.com/vi/${idVideo}/maxresdefault.jpg`
        const thumb1Jpg = `https://i.ytimg.com/vi/${idVideo}/1.jpg`
        const thumb2Jpg = `https://i.ytimg.com/vi/${idVideo}/2.jpg`
        const thumb3Jpg = `https://i.ytimg.com/vi/${idVideo}/3.jpg`

        const thumbDefaultWebp = `https://i.ytimg.com/vi_webp/${idVideo}/default.webp`
        const thumbMqDefaultWebp = `https://i.ytimg.com/vi_webp/${idVideo}/mqdefault.webp`
        const thumbDqDefaultWebp = `https://i.ytimg.com/vi_webp/${idVideo}/hqdefault.webp`
        const thumbSdDefaultWebp = `https://i.ytimg.com/vi_webp/${idVideo}/sddefault.webp`
        const thumbMaxResDefaultWebp = `https://i.ytimg.com/vi_webp/${idVideo}/maxresdefault.webp`
        const thumb1Webp = `https://i.ytimg.com/vi_webp/${idVideo}/1.webp`
        const thumb2Webp = `https://i.ytimg.com/vi_webp/${idVideo}/2.webp`
        const thumb3Webp = `https://i.ytimg.com/vi_webp/${idVideo}/3.webp`

        // const listThumb = [
        //     {
        //         type: "jpg",
        //         image: [
        //             {
        //                 quantity: "MaxResDefaultJpg Quantity",
        //                 url: thumbMaxResDefaultJpg,
        //             },
        //             {
        //                 quantity: "SdDefaultJpg Quantity",
        //                 url: thumbSdDefaultJpg,
        //             },
        //             {
        //                 quantity: "DqDefaultJpg Quantity",
        //                 url: thumbDqDefaultJpg,
        //             },
        //             {
        //                 quantity: "MqDefaultJpg Quantity",
        //                 url: thumbMqDefaultJpg,
        //             },
        //             {
        //                 quantity: "DefaultJpg Quantity",
        //                 url: thumbDefaultJpg,
        //             },
        //             {
        //                 quantity: "StandardJpg1 Quantity",
        //                 url: thumb1Jpg,
        //             },
        //             {
        //                 quantity: "StandardJpg2 Quantity",
        //                 url: thumb2Jpg,
        //             },
        //             {
        //                 quantity: "StandardJpg3 Quantity",
        //                 url: thumb3Jpg,
        //             }
        //         ]
        //     },
        //     {
        //         type: "webp",
        //         image: [
        //             {
        //                 quantity: "MaxResDefaultWebp Quantity",
        //                 url: thumbMaxResDefaultWebp,
        //             },
        //             {
        //                 quantity: "SdDefaultWebp Quantity",
        //                 url: thumbSdDefaultWebp,
        //             },
        //             {
        //                 quantity: "DqDefaultWebp Quantity",
        //                 url: thumbDqDefaultWebp,
        //             },
        //             {
        //                 quantity: "MqDefaultWebp Quantity",
        //                 url: thumbMqDefaultWebp,
        //             },
        //             {
        //                 quantity: "DefaultWebp Quantity",
        //                 url: thumbDefaultWebp,
        //             },
        //             {
        //                 quantity: "StandardWebp1 Quantity",
        //                 url: thumb1Webp,
        //             },
        //             {
        //                 quantity: "StandardWebp2 Quantity",
        //                 url: thumb2Webp,
        //             },
        //             {
        //                 quantity: "StandardWebp3 Quantity",
        //                 url: thumb3Webp,
        //             }
        //         ]
        //     }
        // ]
        const listThumb = [
            {
                type: "jpg",
                image: [
                    {
                        quantity: "MaxResDefault Quantity",
                        urlJPG: thumbMaxResDefaultJpg,
                        urlWebp: thumbMaxResDefaultWebp,
                    },
                    {
                        quantity: "SdDefault Quantity",
                        urlJPG: thumbSdDefaultJpg,
                        urlWebp: thumbSdDefaultWebp,
                    },
                    {
                        quantity: "DqDefault Quantity",
                        urlJPG: thumbDqDefaultJpg,
                        urlWebp: thumbDqDefaultWebp,
                    },
                    {
                        quantity: "MqDefault Quantity",
                        urlJPG: thumbMqDefaultJpg,
                        urlWebp: thumbMqDefaultWebp,
                    },
                    {
                        quantity: "Default Quantity",
                        urlJPG: thumbDefaultJpg,
                        urlWebp: thumbDefaultWebp,
                    },
                    {
                        quantity: "Standard1 Quantity",
                        urlJPG: thumb1Jpg,
                        urlWebp: thumb1Webp,
                    },
                    {
                        quantity: "Standard2 Quantity",
                        urlJPG: thumb2Jpg,
                        urlWebp: thumb2Webp,
                    },
                    {
                        quantity: "Standard3 Quantity",
                        urlJPG: thumb3Jpg,
                        urlWebp: thumb3Webp,
                    }
                ]
            },

        ]


        res.status(200).json({
            listThumb
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            msg: "Internal Server Error",
            error: e
        });
    }
})


module.exports = router;
