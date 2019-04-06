module.exports = {
    collection: [
        {
            name: 'domains',

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