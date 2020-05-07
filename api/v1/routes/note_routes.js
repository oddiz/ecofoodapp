/* eslint-disable spaced-comment */
/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */



module.exports=  function (app, db) {
    
    const highscoreCollection = db.collection(`highscores`);

    app.post('/gethighest', (req, res) => {
        
        
        const getthescore = highscoreCollection.find({foodQty: {$lt: 20}}).
        sort({sp: -1}).
        limit(1).
        toArray();

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
            //output from database find function, will give result as array 
            let time = new (Date)();
            console.log(time + ': Search database output:' + output);

            if (output.length === 0) {
                highscoreCollection.insertOne(newHighScore);
                res.send({
                    message: 'No highscore found for food quantity: ' + reqFoodQty + '. Submitting new highscore.',
                    currentHighscore: [newHighScore]
                })
            } else {

                let foundSP = 0;
                foundSP = output[0].sp;
                if (reqSP > foundSP) {
                    //if recieved(from request) SP is higher than the one on the database
                    
                    highscoreCollection.deleteOne({'foodQty': reqFoodQty})             
                    highscoreCollection.insertOne(newHighScore);
                    
                    //delete the old db value insert the new one.

                    res.send({
                        message: 'New SP is bigger! Replacing old one',
                        currentHighscore: [newHighScore]   
                    });
                } else {
                    res.send({
                        message: 'You didn\'t beat the highscore.',
                        currentHighscore: output 
                    });
                } 
            }
        });

        //update all foodQty to integer
        // highscoreCollection.find().forEach(function (x) {
        //     x.foodQty = parseInt(x.foodQty);
        //     highscoreCollection.save(x);
        // });

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
