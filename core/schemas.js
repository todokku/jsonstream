module.exports = {
    collection: [
        {
            name: 'generals',

            template: {
                shape: {
                    type: String,
                    required: true
                },
                _id: {
                    type: String,
                    required: true
                }
            }
        }
    ]
}