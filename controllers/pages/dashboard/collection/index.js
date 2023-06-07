const { ActionFigure, Coin, Collection, Music, Card } = require('../../../../models');
const withAuth = require('../../../../middleware/auth')

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const collectionData = await Collection.findAll({
            where: { user_id: req.session.user_id }
        })

        const collection = collectionData.map((collection) => collection.get({ plain: true }))

        if (collection.length === 0) {
            const noCollections = true;
            res.render('bigEmpty', { noCollections, logged_in: req.session.logged_in })
        } else {
            res.render('collections', { collection, logged_in: req.session.logged_in });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all coins
router.get('/coin', withAuth, async (req, res) => {
try {
    // find all posts with User names via userId foreign key--returns only the username
    const coinData = await Coin.findAll({
        where: {user_id: req.session.user_id}
    });

    // translate data to plain
    const coin = coinData.map((coin) => coin.get({ plain: true}));
    // render all-posts page with posts data and logged_in bool from session 

    if (coin.length > 0) {
        res.render('view-all', { 
            coin,
            logged_in: req.session.logged_in
        });
    } else {
        res.render('bigEmpty', {logged_in: req.session.logged_in})
    }
 
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all figures
router.get('/figure', withAuth, async (req, res) => {
    try {
        // find all posts with User names via userId foreign key--returns only the username
        const figureData = await ActionFigure.findAll({
            where: { user_id: req.session.user_id }
        });
        // translate data to plain
        const figure = figureData.map((figure) => figure.get({ plain: true }));
        // render all-posts page with posts data and logged_in bool from session 
        if (figure.length > 0) {
            res.render('view-all', { 
                figure,
                logged_in: req.session.logged_in
            });
        } else {
            res.render('bigEmpty', {logged_in: req.session.logged_in})
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all cards
router.get('/card', withAuth, async (req, res) => {
    try {
        // find all posts with User names via userId foreign key--returns only the username
        const cardData = await Card.findAll({
            where: {user_id: req.session.user_id}
        });
        // translate data to plain
        const card = cardData.map((card) => card.get({ plain: true}));
        // render all-posts page with posts data and logged_in bool from session 
        if (card.length > 0) {
            res.render('view-all', { 
                card,
                logged_in: req.session.logged_in
            });
        } else {
            res.render('bigEmpty', {logged_in: req.session.logged_in})
        }
    } catch (err) {
    res.status(500).json(err);
    }
})

// Get all music 
router.get('/music', withAuth, async (req, res) => {
    try {
        // find all posts with User names via userId foreign key--returns only the username
        const musicData = await Music.findAll({
            where: {user_id: req.session.user_id}
        });
        // translate data to plain
        const music = musicData.map((music) => music.get({ plain: true}));
        // render all-posts page with posts data and logged_in bool from session 
        if (music.length > 0) {
            res.render('view-all', { 
                music,
                logged_in: req.session.logged_in
            });
        } else {
            res.render('bigEmpty', {logged_in: req.session.logged_in})
        }
        } catch (err) {
        res.status(500).json(err);
        }
})


router.get('/:id', withAuth, async (req, res) => {
    try {
        const collectionData = await Collection.findByPk(req.params.id, {
            include: [ActionFigure, Music, Coin, Card]
        })

        const parsedData = collectionData.get({ plain: true })

        const collectionId = parsedData.id
        const collectionName = parsedData.name

        if (parsedData.music.length > 0) {
            const music = parsedData.music;
            res.render('collections', { music, collectionName, collectionId, logged_in: req.session.logged_in });
        }
        else if (parsedData.action_figures.length > 0) {
            const figure = parsedData.action_figures;
            res.render('collections', { figure, collectionName, collectionId, logged_in: req.session.logged_in });
        }
        else if (parsedData.coins.length > 0) {
            const coin = parsedData.coins;
            res.render('collections', { coin, collectionName, collectionId, logged_in: req.session.logged_in });
        }
        else if (parsedData.cards.length > 0) {
            const card = parsedData.cards;
            res.render('collections', { card, collectionName, collectionId, logged_in: req.session.logged_in });
        }
        else {
            switch (parsedData.collection_type) {
                case 'Action Figure':
                    const figure = true;
                    res.render('bigEmpty', { figure, collectionName, collectionId, logged_in: req.session.logged_in })
                    break;
                case 'Coin':
                    const coin = true;
                    res.render('bigEmpty', { coin, collectionName, collectionId, logged_in: req.session.logged_in })
                    break;
                case 'Music':
                    const music = true;
                    res.render('bigEmpty', { music, collectionName, collectionId, logged_in: req.session.logged_in })
                    break;
                case 'Card':
                    const card = true;
                    res.render('bigEmpty', { card, collectionName, collectionId, logged_in: req.session.logged_in })
            }
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;