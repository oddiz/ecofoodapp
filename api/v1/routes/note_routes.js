module.exports=  function (app, db) {
    
    const highscoreCollection = db.collection(`highscores`);

    app.post('/gethighest', (req, res) => {
        console.log("got get");
        const getthescore = highscoreCollection.find().sort({sp: -1}).limit(1).toArray();
        getthescore.then((output) => {
            res.send(output[0]);
        })
        
    })
    
    app.post('/highscore', (req, res) => {
        
        /*
         *console.log(req, res);
         *console.log(req.body);
         */
        console.log(req.body.resultMenu);
        const request = req;
        const reqSP = request.body.spAmount, 
        reqMenu = request.body.resultMenu, 
        reqFoodQty = request.body.foodQty;
        
        const findScore = highscoreCollection.find({'foodQty': reqFoodQty}).toArray();
        const newHighScore = { 
            sp: reqSP, 
            menu: reqMenu,
            foodQty: reqFoodQty
        };
        findScore.catch((error) => {
            console.log(error);
        })
        findScore.then((output) => {
            console.log('Search database output:' + output);
            let foundSP = 0;
            if (output.length === 0) {
                highscoreCollection.insertOne(newHighScore);
                res.send({
                    message: 'No highscore found for food quantity: ' + reqFoodQty + '. Submitting new highscore.',
                    currentHighscore: [newHighScore]
                })
            } else {
                foundSP = output[0].sp;
                if (reqSP > foundSP) {
                    
                    highscoreCollection.deleteOne({'foodQty': reqFoodQty})             
                    highscoreCollection.insertOne(newHighScore);
                    
                    res.send({
                        message: 'new SP is bigger! replacing old one',
                        currentHighscore: [newHighScore]   
                    });
                } else {
                    res.send({
                        message: 'you didn\'t beat the highscore.',
                        currentHighscore: output 
                    });
                } 
            }
        });


        

        // highscoreCollection.
        // insert(newHighScore, (err, result) => {
        //     if(err) {
        //         res.send({'error': 'An error occured'})
        //     } else {
        //         res.send(result.ops[0]);
        //     }
        // })
        
        //res.send(Object.keys(req.body.body[0]));
    })
};