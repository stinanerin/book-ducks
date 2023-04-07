module.exports = (plugin) => {
    plugin.controllers.user.updateMe = async (ctx) => {
        if (!ctx.state.user || !ctx.state.user.id) {
            return ctx.response.status = 401;
        }
        const tbrData = ctx.request.body.tbr;

        await strapi.entityService.update('plugin::users-permissions.user', ctx.state.user.id, {
            data: {
                tbr: tbrData
            },
            populate: ["tbr"],

        
        }).then((res) => {
            ctx.response.status = 200;
        })
    }
    plugin.routes['content-api'].routes.push(
        {
            method: "PUT",
            path: "/user/me",
            handler: "user.updateMe",
            config: {
                prefix: "",
                policies: []
            }
        }
    )

    return plugin;
}