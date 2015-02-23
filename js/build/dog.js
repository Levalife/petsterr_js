var dog = {
    full_name: {title: 'Home Name', value: 'Nathan Drake Show Avalanche'},
    home_name: {title: 'Full Name', value: 'Nathan'},
    birthday: {title: 'Birth Day', value: '01.10.2012'},
    gender: {title: 'Gender', value: 'male'},
    kennel_of_live: {title: 'Kennel of live', value: 'SA'},
    kennel_of_live_url: {value: '/'},
    breed: {title: 'Breed', value: 'Berger Blanc Swiss'},
    color: {title: 'Color', value: 'white'},
    height: {title: 'Height', value: '65 cm'},
    mother_name: {title: 'Mother', value: 'Incredible Luck'},
    mother_url: {value: '/'},
    father_name: {title: 'Father', value: 'Kimon'},
    father_url: {value: '/'},
    kennel_of_birth: {title: 'Kennel of birth', value: 'Green Forest'},
    kennel_of_birrh_url: {value: '/'},
    registry: {title: 'Registry number', value: '1223252'},
    tattoo: {title: 'Tattoo', value: '45E6R'},
    microchip: {title: 'Microchip', value: '124325354565447'},
    entitlements: {title: 'Entitlements', value: 'dsf ehg rtsh ,eth rjrsysrkyj,rsyk jsyk,styk tsk, stk tsuk'},
    achievements: {title: 'Achievements', value: 'r4t4t,dfg, erh tjrst rs, rj rsksr, rjysrk'},
    about: {title: 'About', value: 'About dooooogggg'},
    health: {title: 'Health', value: 'Health Something About Health Something About Health Something About Health Something About '},
    news: [{}, {}, {}]
};

var PageBlock = React.createClass({displayName: "PageBlock",
    render: function () {
        return React.createElement("div", null, 
            React.createElement(NavbarBlock, null), 
            React.createElement(MainBlock, {items: ['News', 'Info', 'Pedigree', 'Achievements', 'Health']}), 
            React.createElement(FooterBlock, null)
        );
    }
});

var NavbarBlock = React.createClass({displayName: "NavbarBlock",
    render: function () {
        return React.createElement("div", {className: "navbar"}, 
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "logo"}, "PetsTeRR")

            )
        );
    }
});

var MainBlock = React.createClass({displayName: "MainBlock",
    getInitialState: function () {
        return {active: 0, shown: 0}
    },

    chooseMenu: function (index) {
        this.setState({active: index, shown: index});
    },

    render: function () {
        var self = this;
        var menu_block = this.props.items.map(function (item, index) {
            var style = '';
            if (self.state.active == index) {
                style = 'active';
            }
            return React.createElement(MenuChoiceBlock, {self: self, class: style, title: item, index: index, chooseMenu: self.chooseMenu})
        });
        var info_block = this.props.items.map(function (item, index) {
            var style = '';
            if (self.state.active == index) {
                style = 'show';
            }
            return React.createElement(MenuInfoBlock, {class: style, text: index, index: index})
        });
        return React.createElement("div", {className: "main-block"}, 
            React.createElement("div", {className: "image-cropper"}, 
                React.createElement("img", {className: "dog-photo", src: "static/img/P1110558.jpg"})
            ), 

            React.createElement("div", {className: "name-block"}, 
                React.createElement("div", {className: "container"}, "Nathan Drake Snow Avalanche | Nathan")
            ), 
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "content-block"}, 
                    React.createElement("div", {className: "control-block"}, 
                        React.createElement("ul", null, 
                    menu_block
                        )
                    ), 
                    React.createElement("div", {className: "info-block"}, 
                    info_block

                    )
                )
            )
        );
    }
});

var MenuChoiceBlock = React.createClass({displayName: "MenuChoiceBlock",
    render: function () {
        return React.createElement("li", {className: this.props.class, onClick: this.props.chooseMenu.bind(this.props.self, this.props.index)}, this.props.title)
    }
});

var MenuInfoBlock = React.createClass({displayName: "MenuInfoBlock",
    render: function () {
        var text;
        if (this.props.text == 0) {
            text = 'Some news'
        }
        if (this.props.text == 1) {
            text = React.createElement(InfoPetBlock, null)
        }
        if (this.props.text == 2) {
            text = React.createElement(PedigreePetBlock, null)
        }
        if (this.props.text == 3) {
            text = React.createElement(AchievementsPetBlock, null)
        }
        if (this.props.text == 4) {
            text = React.createElement(HealthPetBlock, null)
        }
        return React.createElement("div", {className: this.props.class, id: 'tab_' + this.props.index}, text)
    }
});

var InfoPetBlock = React.createClass({displayName: "InfoPetBlock",
    render: function () {
        return React.createElement("div", null, 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.birthday.title, ":"), 
            dog.birthday.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.gender.title, ":"), 
            dog.gender.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.kennel_of_live.title, ":"), 
            dog.kennel_of_live.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.breed.title, ":"), 
            dog.breed.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, " ", dog.color.title, ":"), 
            dog.color.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.height.title, ":"), 
            dog.height.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.about.title, ":"), 
            dog.about.value
            )
        )
    }
});

var PedigreePetBlock = React.createClass({displayName: "PedigreePetBlock",
    render: function () {
        return React.createElement("div", null, 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.mother_name.title, ":"), 
            dog.mother_name.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.father_name.title, ":"), 
            dog.father_name.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.kennel_of_birth.title, ":"), 
            dog.kennel_of_birth.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.registry.title, ":"), 
            dog.registry.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, " ", dog.tattoo.title, ":"), 
            dog.tattoo.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.microchip.title, ":"), 
            dog.microchip.value
            )
        )
    }
});

var AchievementsPetBlock = React.createClass({displayName: "AchievementsPetBlock",
    render: function () {
        return React.createElement("div", null, 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.entitlements.title, ":"), 
            dog.entitlements.value
            ), 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.achievements.title, ":"), 
            dog.achievements.value
            )
        )
    }
});

var HealthPetBlock = React.createClass({displayName: "HealthPetBlock",
    render: function () {
        return React.createElement("div", null, 
            React.createElement("div", {className: "info-row"}, 
                React.createElement("div", {className: "label"}, dog.health.title, ":"), 
            dog.health.value
            )
        )
    }
});

var FooterBlock = React.createClass({displayName: "FooterBlock",
    render: function () {
        return React.createElement("div", {className: "footer-block"}, 
            React.createElement("div", {className: "container"}, "footer")
        );
    }
});


React.render(
    React.createElement(PageBlock, null),
    document.body
);