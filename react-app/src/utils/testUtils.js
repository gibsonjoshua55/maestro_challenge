export const clickButton = (wrapper, id) => {
    wrapper.find(`button#${id}`).simulate('click');
}
export const clickDiv = (wrapper, id) => {
    wrapper.find(`div#${id}`).simulate('click');
}

export const clickInput = (wrapper, id) => {
    wrapper.find(`input#${id}`).simulate('click');
}

export const typeInInput = (wrapper, id, text) => {
    wrapper.find(`input#${id}`).simulate('change', {target: {value: text}});
}