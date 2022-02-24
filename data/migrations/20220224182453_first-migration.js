
exports.up = async function(knex) {
    await knex.schema
        .createTable("characters", tbl => {
            tbl.increments();
            tbl.string("name", 255).notNullable().unique();
            tbl.string("animal", 255).notNullable();
        })
        .createTable('badniks', tbl=>{
            tbl.increments('badnik_id')
            tbl.string("name", 255).notNullable().unique();
            tbl.string("zone", 255).notNullable();
        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists("badniks")
        .dropTableIfExists("characters")
};
