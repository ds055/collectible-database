const { ActionFigure, Coin, Collection, Music, Card } = require('../../../../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const collectionData = await Collection.findAll({
            where: {user_id: req.session.user_id}
        })

        const collection = collectionData.map((collection) => collection.get({ plain: true }))

    res.render('collections', { collection, logged_in: req.session.logged_in });
    } catch (err) {
    res.status(500).json(err);
    }
});

// TODO: req.session.logged_in to other routes
router.get('/:id', async (req, res) => {
    try {
        const collectionData = await Collection.findByPk(req.params.id, {
            include: [ActionFigure, Music, Coin, Card]
        })
        
        const parsedData = collectionData.get({ plain: true })


        if(parsedData.music.length > 0) {
            const music = parsedData.music;
            res.render('collections', { music, logged_in: req.session.logged_in  });
        }
        else if(parsedData.action_figures.length > 0) {
            const figure = parsedData.action_figures;
            res.render('collections', { figure, logged_in: req.session.logged_in });
        }
        else if(parsedData.coins.length > 0) {
            const coin = parsedData.coins;
            res.render('collections', { coin, logged_in: req.session.logged_in });
        }
        else if(parsedData.card.length > 0) {
            const card = parsedData.card;
            res.render('collections', { card, logged_in: req.session.logged_in });    
        }
        else {
            res.render('collections', {logged_in: req.session.logged_in})
        }
    
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/coin', async (req, res) => {
try {
    // find all posts with User names via userId foreign key--returns only the username
    const coinData = await Coin.findAll({
        where: {user_id: 1}
    });

    // translate data to plain
    const coin = coinData.map((coin) => coin.get({ plain: true}));
    // render all-posts page with posts data and logged_in bool from session 
    res.render('collections', { 
        coin,
        logged_in: req.session.logged_in
    });
    } catch (err) {
    res.status(500).json(err);
    }
})

router.get('/figure', async (req, res) => {
    try {
        // find all posts with User names via userId foreign key--returns only the username
        const figureData = await ActionFigure.findAll({
            where: {user_id: 4}
        });
    
        // translate data to plain
        const figure = figureData.map((figure) => figure.get({ plain: true}));
        // render all-posts page with posts data and logged_in bool from session 
        res.render('collections', { 
            figure,
            logged_in: req.session.logged_in
        });
        } catch (err) {
        res.status(500).json(err);
        }
    })

module.exports = router;