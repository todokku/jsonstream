/**
 * Support Node.js script built on the top of mognoose technology.
 * The purpose of this simple code is to SQL-ize mongoose
 * syntax and simplify working with schemas/models/collections.
 * 
 * @author Andrej Noskaj
 * @version 1.0.2
 * @license MIT
 */

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
            for(let i in feed) {
                this.schemas[feed[i].name] = new this.mongoose.Schema(feed[i].template, {strict: true});
            }
        },


        /**
         * Insert record into collection.
         * 
         * Sample use:
         * flow.insertInto('items').values({title: 'title', content: 'content'});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.insertInto = (collection) => {
            return [collection];
        }


        /**
         * Execute insertion process.
         * 
         * @param {Object} values
         * @returns {Number}
         */

        Array.prototype.values = async function(values) {

            let name = this[0].toString();
            let model = flow.mongoose.model(name, flow.schemas[name]);
            let build = new model(values);

            try {
                await build.save();
                console.log(`Inserted into ${name}.`);
                return 200;
            }
            catch(exception) {
                console.log(`Exception occured during saving.`);
                console.log(exception);
                return 400;
            }
        }


        /**
         * Change ALL collection records.
         * 
         * Sample use:
         * flow.update('items').change({title: 'title'}).into({title: 'new title'});
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
         * flow.updateOneIn('items').change({title: 'title'}).into({title: 'new title'});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.updateOneIn = (collection) => {
            return [collection, 'update$'];
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

            if (op === 'update$') {
                flow.mongoose.connection.collection(name).updateOne(from, {$set: into});
            } else {
                flow.mongoose.connection.collection(name).updateMany(from, {$set: into});
            }
        } 


        /**
         * Remove all records from collection.
         * 
         * Sample use:
         * flow.remove('items').where({title: 'title'});
         *  
         * @param {String} collection 
         * @returns {Array}
         */

        this.remove = (collection) => {
            return [collection, 'remove'];
        }


        /**
         * Remove one from collection.
         * 
         * Sample use:
         * flow.removeOneFrom('items').where({title: 'title'});
         *  
         * @param {String} collection 
         * @returns {Array}
         */

        this.removeOneFrom = (collection) => {
            return [collection, 'remove$'];
        }


        /**
         * Find one record matching condition.
         * 
         * Sample use:
         * flow.find('items').where({title: 'title'});
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
         * flow.findOneIn('items').where({title: 'title'});
         * 
         * @param {String} collection
         * @returns {Array}
         */

        this.findOneIn = (collection) => {
            return [collection, 'find$'];
        }


        /**
         * Execute find/removal process.
         * 
         * @param {Object} values
         * @returns {Object}
         */

        Array.prototype.where = async function(values) {

            let name = this[0].toString();
            let op = this[1];

            try {
                if (~op.indexOf('find')) {

                    if (op === 'find$') {
                        let result = await flow.mongoose.connection.collection(name).findOne(values);
                        return result || {};
                    } else {
                        let result = await flow.mongoose.connection.collection(name).find(values);
                        return result.toArray() || [];
                    }

                } else {

                    if (op === 'remove$') {
                        flow.mongoose.connection.collection(name).deleteOne(values);
                    } else {
                        flow.mongoose.connection.collection(name).deleteMany(values);
                    }

                }
            }
            catch(exception) {
                return {};
            }
        }
    }
}