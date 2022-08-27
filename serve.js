const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const s3 = new AWS.S3();
const ecoBucket = "ecodiet.kaansarkaya.com";

async function getObjects() {
    const ecoObjects = (
        await s3
        .listObjectsV2({
            Bucket: ecoBucket,
        })
        .promise()
    ).Contents.map((obj) => {
        return {
            Key: obj.Key,
        };
    });

    return ecoObjects;
}

const uploadFolder = async function () {
    const config = {
        folderPath: "./dist",
    };

    const distFolderPath = path.join(__dirname, config.folderPath);
    fs.readdir(distFolderPath, (err, files) => {
        if (!files || files.length === 0) {
            console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
            console.log("Make sure your project was compiled!");
            return;
        }

        // for each file in the directory
        for (const fileName of files) {
            // get the full path of the file
            const filePath = path.join(distFolderPath, fileName);

            // ignore if directory
            if (fs.lstatSync(filePath).isDirectory()) {
                continue;
            }

            // read file contents
            fs.readFile(filePath, (error, fileContent) => {
                // if unable to read file contents, throw exception
                if (error) {
                    throw error;
                }

                console.log(fileName)
                // upload file to S3
                s3.putObject({
                        Bucket: ecoBucket,
                        Key: fileName,
                        Body: fileContent,
                    },
                    (res) => {
                        console.log(`Successfully uploaded '${fileName}'!`);
                    }
                );
            });
        }
    });
};
const uploadDir = function (s3Path, bucketName) {
    let s3 = new AWS.S3();

    function walkSync(currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    }

    walkSync(s3Path, function (filePath, stat) {
        let bucketPath = filePath.substring(s3Path.length + 1);
        let params = {
            Bucket: bucketName,
            Key: bucketPath,
            Body: fs.readFileSync(filePath),
        };
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully uploaded " + bucketPath + " to " + bucketName);
            }
        });
    });
};

const uploadWithCli = async function () {


    const distDir = path.join(__dirname, 'dist')
    const command = `aws s3 sync ${distDir} s3://${ecoBucket}`

    exec(command)
        .then(() => console.log('Deploy complete'))
        .catch(err => {
            console.log(err)
        })
}
const deleteAll = async function () {
    const ecoObjects = await getObjects();

    const delParams = {
        Bucket: ecoBucket,
        Delete: {
            Objects: ecoObjects,
        },
    };

    await s3.deleteObjects(delParams).promise();
};

const main = async function () {
    await deleteAll()
    await uploadWithCli();
};

main();