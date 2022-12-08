const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

{% set schemaName =  data["resource"]+"Schema" %}
const {{schemaName}} = mongoose.Schema(
    {
        {% for field in data["fields"] -%}
            {{field["name"]}}: {
                type: {{field["type"]}},
                required: false
        },
        {% endfor %}
    }
);

{{schemaName}}.plugin(toJSON);
{{schemaName}}.plugin(paginate);
const mongoModule = mongoose.model('{{data["resource"]}}', {{schemaName}});
module.exports = mongoModule;