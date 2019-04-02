module.exports = {

    flow: function(_inst) {
        
        /**
         * Necessary local variables for flow.
         */

        this.mongoose = _inst;
        this.schemas = new Object();


        /**
         * Build schemas from user defined collection array.
         */

        this.feed = (feed) => {
            for(let i=0; i<feed.length; i++) {
                this.schemas[feed[i].name] = new this.mongoose.Schema(feed[i].template, {strict: true});
            }
        },


        /**
         * Insert record into collection.
         * 
         * Sample use:
         * flow.insertInto("items").values({title: "title", content: "content"});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.insert = (collection) => {
            return [collection];
        }


        /**
         * Execute insertion process.
         * 
         * @param {Object} values
         */

        Array.prototype.values = function(values) {
            let name = this[0].toString();
            let model = flow.mongoose.model(name, flow.schemas[name]);
            let build = new model(values);

            try {
                build.save((error) => {
                    console.log(`Inserted into ${name}.`);
                    if(error) {
                        console.log(`Insertion into ${name} failed.`);
                    }
                });
            }
            catch(exception) {
                console.log(`Exception occured during saving.`);
            }
        }


        /**
         * Change ALL collection records.
         * 
         * Sample use:
         * flow.update("items").change({title: "title"}).into({title: "new title"});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.update = (collection) => {
            return [collection, 'update'];
        }


        /**
         * Change one collection record.
         * 
         * Sample use:
         * flow.updateOne("items").change({title: "title"}).into({title: "new title"});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.updateOne = (collection) => {
            return [collection, 'updateOne'];
        }


        /**
         * Part of change process chain. Specify change condition.
         * 
         * @param {Object} from
         * @returns {Array}
         */

        Array.prototype.change = function(from) {
            let name = this[0].toString();
            let op = this[1];
            return [name, from, op];
        }

        
        /**
         * Finish change process chain.
         * 
         * @param {Object} into
         */

        Array.prototype.into = function(into) {
            let name = this[0];
            let from = this[1];
            let op = this[2];

            if(op === 'updateOne') {
                flow.mongoose.connection.collection(name).updateOne(from, {$set: into});
            } else {
                flow.mongoose.connection.collection(name).updateMany(from, {$set: into});
            }
        } 


        /**
         * Remove all from collection.
         * 
         * Sample use:
         * flow.remove("items").where({title: "title"});
         *  
         * @param {String} collection 
         */

        this.remove = (collection) => {
            return [collection, 'remove'];
        }


        /**
         * Remove one from collection.
         * 
         * Sample use:
         * flow.removeOne("items").where({title: "title"});
         *  
         * @param {String} collection 
         */

        this.removeOne = (collection) => {
            return [collection, 'removeOne'];
        }


        /**
         * Find one record matching condition.
         * 
         * Sample use:
         * flow.find("items").where({title: "title"});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.find = (collection) => {
            return [collection, 'find'];
        }


        /**
         * Find one record matching condition.
         * 
         * Sample use:
         * flow.findOne("items").where({title: "title"});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.findOne = (collection) => {
            return [collection, 'findOne'];
        }


        /**
         * Execute find/removal process.
         * 
         * @param {Object} values
         * @returns {Promise}
         */

        Array.prototype.where = function(values) {
            let name = this[0].toString();
            let op = this[1];

            if(op.indexOf('find') > -1) {
                return new Promise((resolve) => {
                    if(op === 'findOne') {
                        var result = flow.mongoose.connection.collection(name).findOne(values);
                        resolve(result);
                    } else {
                        var result = flow.mongoose.connection.collection(name).find(values);
                        result.toArray().then((result) => {
                            resolve(result.toArray());
                        });
                    }
                });
            } else {
                if(op === 'removeOne') {
                    flow.mongoose.connection.collection(name).deleteOne(values);
                } else {
                    flow.mongoose.connection.collection(name).deleteMany(values);
                }
            }
        }
    }
}