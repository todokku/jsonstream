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

    global.flow: function(_inst) {
        
        this.mongoose = _inst;
        this.schemas = new Object();

        /**
         * Build schemas from user defined collection array.
         * 
         * @param feed - Mongoose schema defining storage shape
         */
        this.feed = (feed) => {
            for(let i=0; i < feed.length; i++) {
                this.schemas[feed[i].name] = new this.mongoose.Schema(feed[i].template, {strict: true});
            }
        },

        /**
         * Insert record into collection.
         * 
         * Sample use:
         * global.flow.insertInto('items').values({title: 'title', content: 'content'});
         * 
         * @param collection - Collection name
         * @returns Array-ized collection
         */
        this.insertInto = (collection) => {
            return [collection];
        }

        /**
         * Execute insertion process.
         * 
         * @param values - Object to be inserted into db
         * @returns Status code 
         */
        Array.prototype.values = async function(values) {

            let name = this[0].toString();
            let model = global.flow.mongoose.model(name, global.flow.schemas[name]);
            let build = new model(values);

            try {
                await build.save();
                console.log(`Inserted into ${name}.`);
                return 200;

            } catch (exception) {
                console.log(`Exception occured during saving into ${name}.`);
                console.log(exception);
                return 400;
            }
        }

        /**
         * Change ALL collection records.
         * 
         * Sample use:
         * global.flow.update('items').change({title: 'title'}).into({title: 'new title'});
         * 
         * @param collection - Collection name
         * @returns Packed metadata
         */
        this.update = (collection) => {
            return [collection, 'update'];
        }

        /**
         * Change one collection record.
         * 
         * Sample use:
         * global.flow.updateOneIn('items').change({title: 'title'}).into({title: 'new title'});
         * 
         * @param collection - Collection name
         * @returns Packed metadata
         */
        this.updateOneIn = (collection) => {
            return [collection, 'update$'];
        }

        /**
         * Part of change process chain. Specify change condition.
         * 
         * @param from - Data object we are changing
         * @returns Packed metadata
         */
        Array.prototype.change = function(from) {
            let name = this[0].toString();
            let op = this[1];

            return [name, from, op];
        }
        
        /**
         * Finish change process chain.
         * 
         * @param into - Data object we are seeking
         */
        Array.prototype.into = function(into) {

            let name = this[0];
            let from = this[1];
            let op = this[2];

            if (op === 'update$') {
                global.flow.mongoose.connection.collection(name).updateOne(from, {$set: into});
                console.log(`Update one performed on ${name}.`);
            } else {
                global.flow.mongoose.connection.collection(name).updateMany(from, {$set: into});
                console.log(`Update many performed on ${name}.`);
            }
        }

        /**
         * Remove all records from collection.
         * 
         * Sample use:
         * global.flow.remove('items').where({title: 'title'});
         *  
         * @param collection - Collection name 
         * @returns Packed metadata
         */
        this.remove = (collection) => {
            return [collection, 'remove'];
        }

        /**
         * Remove one from collection.
         * 
         * Sample use:
         * global.flow.removeOneFrom('items').where({title: 'title'});
         *  
         * @param collection - Collection name
         * @returns Packed metadata
         */
        this.removeOneFrom = (collection) => {
            return [collection, 'remove$'];
        }

        /**
         * Find one record matching condition.
         * 
         * Sample use:
         * global.flow.find('items').where({title: 'title'});
         * 
         * @param collection - Collection name
         * @returns Packed metadata
         */
        this.find = (collection) => {
            return [collection, 'find'];
        }

        /**
         * Find one record matching condition.
         * 
         * Sample use:
         * global.flow.findOneIn('items').where({title: 'title'});
         * 
         * @param collection - Collection name
         * @returns Packed metadata
         */
        this.findOneIn = (collection) => {
            return [collection, 'find$'];
        }

        /**
         * Execute find/removal process.
         * 
         * @param values - Object defining searched structure
         * @returns Searched structure
         */
        Array.prototype.where = async function(values) {

            let name = this[0].toString();
            let op = this[1];

            try {
                if (op.includes('find')) {

                    if (op === 'find$') {
                        let result = await global.flow.mongoose.connection.collection(name).findOne(values);
                        console.log(`Finding one in ${name}.`);
                        return result || {};
                    } else {
                        let result = await global.flow.mongoose.connection.collection(name).find(values);
                        console.log(`Finding in ${name}.`);
                        return result.toArray() || [];
                    }

                } else {

                    if (op === 'remove$') {
                        global.flow.mongoose.connection.collection(name).deleteOne(values);
                        console.log(`Deleted one from ${name}.`);
                    } else {
                        global.flow.mongoose.connection.collection(name).deleteMany(values);
                        console.log(`Deleted many from ${name}.`);
                    }

                }
            } catch (exception) {
                return {};
            }
        }
    }
}