const VC_ENUM_NUM = "enum:200"

function update_option(vc_enum, new_option_key, new_option_title, old_option_key) {
    let old_config = vc_enum.getConfig();
    let options = old_config.options;
    let meta = old_config.meta;

    let option_idx = options.indexOf(old_option_key);
    if (option_idx > -1) {
        options[option_idx] = new_option_key;
        delete meta.ui.titles[old_option_key];
        delete meta.ui.images[old_option_key];
    } else {
        options.push(new_option_key);
    }
    meta.ui.titles[new_option_key] = new_option_title;
    meta.ui.images[new_option_key] = null;

    let config = {
        options: options,
        meta: meta
    }
    vc_enum.setConfig(config);
}

let vc_enum = Virtual.getHandle(VC_ENUM_NUM);
update_option(vc_enum, "4", "option 3");