const { ActionFigure, Coin, Collection, Music, Card } = require('../../../../models');
const withAuth = require('../../../../middleware/auth')

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const collectionData = await Collection.findAll({
            where: {user_id: req.session.user_id}
        })

        const collection = collectionData.map((collection) => collection.get({ plain: true }))

        console.log(collection)

        if(collection.length === 0){
            const noCollections = true;
            res.render('bigEmpty', {noCollections})
        }else {
            res.render('collections', { collection, logged_in: req.session.logged_in });
        }

    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/coin', withAuth, async (req, res) => {
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

router.get('/figure', withAuth, async (req, res) => {
    try {
        // find all posts with User names via userId foreign key--returns only the username
        const figureData = await ActionFigure.findAll({
            where: {user_id: req.session.user_id}
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

    // TODO: req.session.logged_in to other routes
router.get('/:id', withAuth, async (req, res) => {
    try {
        const collectionData = await Collection.findByPk(req.params.id, {
            include: [ActionFigure, Music, Coin, Card]
        })
        
        const parsedData = collectionData.get({ plain: true })

        const collectionId = parsedData.id

        if(parsedData.music.length > 0) {
            const music = parsedData.music;
            res.render('collections', { music, collectionId, logged_in: req.session.logged_in  });
        }
        else if(parsedData.action_figures.length > 0) {
            const figure = parsedData.action_figures;
            res.render('collections', { figure, collectionId, logged_in: req.session.logged_in });
        }
        else if(parsedData.coins.length > 0) {
            const coin = parsedData.coins;
            res.render('collections', { coin, collectionId, logged_in: req.session.logged_in });
        }
        else if(parsedData.cards.length > 0) {
            const card = parsedData.cards;
            res.render('collections', { card, collectionId, logged_in: req.session.logged_in });    
        }
        else {
            switch(parsedData.type) {
                case 'Action Figure': 
                    res.render('bigEmpty', { figure, collectionId, logged_in: req.session.logged_in})
                    break;
                case 'Coin':
                    res.render('bigEmpty', { coin, collectionId, logged_in: req.session.logged_in})
                    break;
                case 'Music':
                    res.render('bigEmpty', { music, collectionId, logged_in: req.session.logged_in})
                    break;
                case 'Card':
                    res.render('bigEmpty', { card, collectionId, logged_in: req.session.logged_in})
            }
        }
    
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;