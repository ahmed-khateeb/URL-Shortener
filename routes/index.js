let randomstring = require("randomstring"),
    expressions = require("../helpers/regex"),
    Url = require('../models/url.js');

module.exports = (app, server) => {
    app.get('/:slug', async (req, res) => {
        if (req.params.slug) {
            try {
                let urlObj = await Url.findOne({ 'slug': req.params.slug });
                if (urlObj) {
                    let _url2Redirect = urlObj.url;
                    urlObj.counter = urlObj.counter + 1
                    await urlObj.save()
                    return res.render('redir', { redirect: _url2Redirect });
                } else {
                    req.session.flash = {
                        type: 'danger',
                        intro: 'Uh oh,',
                        message: 'We couldn\'t find a link for the URL you clicked.'
                    };
                    res.redirect('/');
                }
            }
            catch (err) {
                req.session.flash = {
                    type: 'danger',
                    intro: 'Uh oh,',
                    message: `Error occurred while searching url for slug:" + ${req.params.slug}`
                };
                res.redirect('/');
            }
        }
    });

    /* GET home page. */
    app.get('/', (req, res) => {
        res.render('home');
    });

    /* Creating short url. */
    app.post('/shortener', async (req, res) => {
        let { url } = req.body
        let emailExpression = expressions.email
        if (!(url.match(emailExpression))) {
            req.session.flash = {
                type: 'danger',
                intro: 'Ooops!',
                message: 'Seems you entered an invalid URL.'
            };
            return res.redirect(303, '/');
        }
        let urlObj = new Url({
            url: url,
            slug: randomstring.generate(5)
        });
        try {
            await urlObj.save()
            req.session.flash = {
                type: 'success',
                intro: 'DONE!!',
                message: 'YOU\'VE CREATED YOUR URL SHORTENER!',
                slug: urlObj.slug
            };
            return res.redirect(303, '/');
        }
        catch (e) {
            req.session.flash = {
                type: 'danger',
                intro: 'Ooops!',
                message: 'There was an error processing your request.'
            };
        }
    });
};

