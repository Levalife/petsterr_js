var dog = {
    full_name: {title: 'Home Name', value: 'Nathan Drake Show Avalanche'},
    home_name: {title: 'Full Name', value: 'Nathan'},
    birthday: {title: 'Birth Day', value: '2012-10-02'},
    gender: {title: 'Gender', value: 'female'},
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
    health: {
        title: 'Health',
        value: 'Health Something About Health Something About Health Something About Health Something About '
    },
    news: [
        {
            author: 'greenday',
            content: 'la la la lala la lala la lala la la',
            created_at: '12.03.2012'
        },
        {
            author: 'greenday',
            content: 'bla la la lala la labla bla bla la labla  lala la la',
            created_at: '12.03.2012'
        },
        {
            author: 'greenday',
            content: 'cla cla la lala la lacla bla cbla la lacla  lala cla la',
            created_at: '12.03.2012'
        }]
};

var breeds = [
    {title: 'White Swiss Shepherd', value: 'wss', url: ''},
    {title: 'German Shepherd', value: 'gs', url: ''},
    {title: 'Golder Retriever', value: 'gr', url: ''}];

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
        return React.createElement("div", {className: "navbar-block"}, 
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
        $('.main-block').css('height', '');

    },

    componentDidUpdate: function () {
        if ($(window).height() >= $(document.body).height()) {
            $('.main-block').css('height', $(window).height() - $('.footer-block').outerHeight() - $('.navbar-block').outerHeight());
        }
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
            return React.createElement(MenuInfoBlock, {class: style, index: index})
        });
        return React.createElement("div", {className: "main-block"}, 
            React.createElement("div", {className: "image-cropper"}, 
                React.createElement("img", {className: "dog-photo", src: "static/img/P1110558.jpg"})
            ), 

            React.createElement("div", {className: "name-block"}, 
                React.createElement("div", {className: "container"}, dog.full_name.value, " | ", dog.home_name.value)
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
        return React.createElement("li", {className: this.props.class, onClick: this.props.chooseMenu.bind(this.props.self, this.props.index), "data-index": this.props.index}, " ", this.props.title)
    }
});

var MenuInfoBlock = React.createClass({displayName: "MenuInfoBlock",
    render: function () {
        var text,
            self = this;
        if (this.props.index == 0) {
            text = React.createElement(NewsBlock, {index: self.props.index})
        }
        if (this.props.index == 1) {
            text = React.createElement(InfoPetBlock, {index: self.props.index})
        }
        if (this.props.index == 2) {
            text = React.createElement(PedigreePetBlock, {index: self.props.index})
        }
        if (this.props.index == 3) {
            text = React.createElement(AchievementsPetBlock, {index: self.props.index})
        }
        if (this.props.index == 4) {
            text = React.createElement(HealthPetBlock, {index: self.props.index})
        }
        return React.createElement("div", {className: self.props.class, id: 'tab_' + self.props.index}, text)
    }
});

var NewsBlock = React.createClass({displayName: "NewsBlock",
    render: function () {
        return React.createElement("div", null, 
            React.createElement(NewsForm, {index: this.props.index}), 
            dog.news.map(function (item) {
                return React.createElement(NewsItemBlock, {item: item})
            })
        );
    }
});

var NewsForm = React.createClass({displayName: "NewsForm",
    getInitialState: function () {
        return {content: '', buttons: false, photos: true}
    },

    componentWillUpdate: function () {
        var index = $('.active').data('index');
        if (index != this.props.index && this.state.content != '') {
            this.setState({content: ''});
        }
    },

    initChange: function (e) {
        this.setState({content: e.target.value});
    },

    submitForm: function () {
        var form = $(this.refs.news_form.getDOMNode())[0];
        var data = new FormData(form);
        //var data = {content: this.state.content};
        console.log(data);
    },

    initShowButtons: function () {
        this.setState({buttons: true});
    },

    initShowPhotos: function () {
        //this.setState({photos: true});
        $('#id_photos').click();
    },

    initImageChange: function (e) {
        var self = this;
        $('#news-images-block').html('').attr('style', "overflow: scroll");
        if (e.target.files) {
            var file_length = e.target.files.length;
            for (var i = 0; i < file_length; i++) {
                var reader = new FileReader();
                console.log(e.target.name);

                reader.onload = function (e) {
                    //$('#news-images-block').append('<div class="image-cropper"><img src="' + e.target.result + '"/></div>');
                    $('#news-images-block').append('<div class="image-cropper"></div>');
                    $('.image-cropper:last-child').attr('style', "background-image: url('" + e.target.result + "')");
                };
                reader.readAsDataURL(e.target.files[i]);

            }
        } else {
        }
    },

    render: function () {
        var self = this,
            buttons = this.state.buttons ? React.createElement("div", {className: "news-form-buttons"}, 
                React.createElement("div", {className: "news-images-block", id: "news-images-block"}), 
                React.createElement("img", {className: "photo-button", src: "static/img/no_photo.png", onClick: this.initShowPhotos}), 

                React.createElement("input", {type: "button", onClick: self.submitForm, value: "Save"})

            ) : '',
            photos = this.state.photos ?
                React.createElement("input", {type: "file", id: "id_photos", name: "photos", multiple: true, onChange: this.initImageChange}) : '';
        return React.createElement("form", {className: "news-form-block", ref: "news_form"}, 
            React.createElement("textarea", {name: "content", id: "id_content", value: self.state.content, onChange: self.initChange, onClick: self.initShowButtons}), 
            self.state.photos_img, 
            buttons, 
            photos

        )
    }
});

var NewsItemBlock = React.createClass({displayName: "NewsItemBlock",
    render: function () {
        return React.createElement("div", {className: "news-item-block"}, 
        this.props.item.content, 
            React.createElement("div", {className: "news-item-footer"}, 
                React.createElement("span", {className: "created-at"}, this.props.item.created_at), 
                React.createElement("span", {className: "author"}, this.props.item.author)
            )
        )
    }
});

var InfoPetBlock = React.createClass({displayName: "InfoPetBlock",
    getInitialState: function () {
        return {
            show_form: false, form: {
                full_name: dog.full_name.value, home_name: dog.home_name.value,
                birthday: dog.birthday.value, gender: dog.gender.value, kennel_of_live: dog.kennel_of_live.value,
                breed: dog.breed.value, color: dog.color.value, height: dog.height.value
            }
        }
    },

    componentWillUpdate: function () {
        var index = $('.active').data('index');
        if (this.state.show_form == true && index != this.props.index) {
            this.cancelShowForm();
        }
    },

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
    },

    initChange: function (key, e) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },

    initSelectChange: function (key) {
        var new_form = this.state.form;
        var new_value = this.refs[key].getDOMNode().value;
        new_form[key] = new_value;
        this.setState({form: new_form});
    },

    cancelShowForm: function () {
        this.setState({
            show_form: false,
            form: {
                full_name: dog.full_name.value, home_name: dog.home_name.value,
                birthday: dog.birthday.value, gender: dog.gender.value, kennel_of_live: dog.kennel_of_live.value,
                breed: dog.breed.value, color: dog.color.value, height: dog.height.value
            }
        });
    },

    submitForm: function () {
        var data = this.state.form;
        console.log(data);
        this.setState({show_form: false});
    },

    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = React.createElement("form", null, 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.full_name.title, ":"), 
                    React.createElement("input", {type: "text", name: "full_name", id: "id_full_name", value: self.state.form.full_name, onChange: self.initChange.bind(self, 'full_name')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.home_name.title, ":"), 
                    React.createElement("input", {type: "text", name: "home_name", id: "id_home_name", value: self.state.form.home_name, onChange: self.initChange.bind(self, 'home_name')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.birthday.title, ":"), 
                    React.createElement("input", {type: "date", name: "birthday", id: "id_birthday", value: self.state.form.birthday, onChange: self.initChange.bind(self, 'birthday')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.gender.title, ":"), 
                    React.createElement("select", {name: "gender", ref: "gender", id: "id_gender", value: self.state.form.gender, onChange: self.initSelectChange.bind(self, 'gender')}, 
                        React.createElement("option", {value: "male"}, "Male"), 
                        React.createElement("option", {value: "female"}, "Female")
                    )
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.kennel_of_live.title, ":"), 
                    React.createElement("input", {type: "text", name: "kennel_of_live", id: "id_kennel_of_live", value: self.state.form.kennel_of_live, onChange: self.initChange.bind(self, 'kennel_of_live')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.breed.title, ":"), 
                    React.createElement("select", {name: "breed", ref: "breed", id: "id_breed", value: self.state.form.breed, onChange: self.initSelectChange.bind(self, 'breed')}, 
                    breeds.map(function (item) {
                        return React.createElement(OptionBlock, {item: item})
                    })
                    )
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.color.title, ":"), 
                    React.createElement("input", {type: "text", name: "color", id: "id_color", value: self.state.form.color, onChange: self.initChange.bind(self, 'color')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.height.title, ":"), 
                    React.createElement("input", {type: "text", name: "height", id: "id_height", value: self.state.form.height, onChange: self.initChange.bind(self, 'height')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("input", {type: "button", onClick: self.submitForm, value: "Save"}), 
                    React.createElement("input", {type: "button", onClick: self.cancelShowForm, value: "Cancel"})
                )
            )
        } else {
            content = React.createElement("div", null, 
                React.createElement("img", {src: "static/img/pencil.png", className: "edit-pet-button", onClick: self.changeShowForm}), 

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
        return React.createElement("div", null, content);
    }
});

var OptionBlock = React.createClass({displayName: "OptionBlock",
    render: function () {
        return React.createElement("option", {value: this.props.item.value}, this.props.item.title)
    }
});

var PedigreePetBlock = React.createClass({displayName: "PedigreePetBlock",
    getInitialState: function () {
        return {
            show_form: false, form: {
                mother: dog.mother_name.value, father: dog.father_name.value,
                kennel_of_birth: dog.kennel_of_birth.value, registry: dog.registry.value, tattoo: dog.tattoo.value,
                microchip: dog.microchip.value
            }
        };
    },

    componentWillUpdate: function () {
        var index = $('.active').data('index');
        if (this.state.show_form == true && index != this.props.index) {
            this.cancelShowForm();
        }
    },

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});

    },

    initChange: function (key, e) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },

    cancelShowForm: function () {
        this.setState({
            show_form: false,
            form: {
                mother: dog.mother_name.value, father: dog.father_name.value,
                kennel_of_birth: dog.kennel_of_birth.value, registry: dog.registry.value, tattoo: dog.tattoo.value,
                microchip: dog.microchip.value
            }
        });
    },

    submitForm: function () {
        var data = this.state.form;
        console.log(data);
        this.setState({show_form: false});
    },

    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = React.createElement("form", null, 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.mother_name.title, ":"), 
                    React.createElement("input", {type: "text", name: "mother", id: "id_mother", value: self.state.form.mother, onChange: self.initChange.bind(self, 'mother')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.father_name.title, ":"), 
                    React.createElement("input", {type: "text", name: "father", id: "id_father", value: self.state.form.father, onChange: self.initChange.bind(self, 'father')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.kennel_of_birth.title, ":"), 
                    React.createElement("input", {type: "text", name: "kennel_of_birth", id: "id_kennel_of_birth", value: self.state.form.kennel_of_birth, onChange: self.initChange.bind(self, 'kennel_of_birth')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.registry.title, ":"), 
                    React.createElement("input", {type: "text", name: "registry", id: "id_registry", value: self.state.form.registry, onChange: self.initChange.bind(self, 'registry')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.tattoo.title, ":"), 
                    React.createElement("input", {type: "text", name: "tattoo", id: "id_tattoo", value: self.state.form.tattoo, onChange: self.initChange.bind(self, 'tattoo')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.microchip.title, ":"), 
                    React.createElement("input", {type: "text", name: "microchip", id: "id_microchip", value: self.state.form.microchip, onChange: self.initChange.bind(self, 'microchip')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("input", {type: "button", onClick: self.submitForm, value: "Save"}), 
                    React.createElement("input", {type: "button", onClick: self.cancelShowForm, value: "Cancel"})
                )
            )
        } else {
            content = React.createElement("div", null, 
                React.createElement("img", {src: "static/img/pencil.png", className: "edit-pet-button", onClick: self.changeShowForm}), 
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
        return React.createElement("div", null, content)
    }
});

var AchievementsPetBlock = React.createClass({displayName: "AchievementsPetBlock",
    getInitialState: function () {
        return {show_form: false, form: {entitlements: dog.entitlements.value, achievements: dog.achievements.value}}
    },

    componentWillUpdate: function () {
        var index = $('.active').data('index');
        if (this.state.show_form == true && index != this.props.index) {
            this.cancelShowForm();
        }
    },

    componentDidUpdate: function () {
        if ($(window).height() >= $(document.body).height()) {
            $('.main-block').css('height', $(window).height() - $('.footer-block').outerHeight() - $('.navbar-block').outerHeight());
        }
    },

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
        $('.main-block').css('height', '');

    },

    initChange: function (key, e) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },

    cancelShowForm: function () {
        this.setState({
            show_form: false,
            form: {
                entitlements: dog.entitlements.value,
                achievements: dog.achievements.value
            }
        });
    },

    submitForm: function () {
        var data = this.state.form;
        console.log(data);
        this.setState({show_form: false});
    },
    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = React.createElement("form", null, 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.entitlements.title, ":"), 
                    React.createElement("textarea", {name: "entitlements", onChange: self.initChange.bind(self, 'entitlements'), value: self.state.form.entitlements})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.achievements.title, ":"), 
                    React.createElement("textarea", {name: "achievements", onChange: self.initChange.bind(self, 'achievements'), value: self.state.form.achievements})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("input", {type: "button", onClick: self.submitForm, value: "Save"}), 
                    React.createElement("input", {type: "button", onClick: self.cancelShowForm, value: "Cancel"})
                )
            )
        } else {
            content = React.createElement("div", null, 
                React.createElement("img", {src: "static/img/pencil.png", className: "edit-pet-button", onClick: self.changeShowForm}), 
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
        return React.createElement("div", null, content)
    }
});

var HealthPetBlock = React.createClass({displayName: "HealthPetBlock",
    getInitialState: function () {
        return {show_form: false, form: {health: dog.health.value}}
    },

    componentWillUpdate: function () {
        var index = $('.active').data('index');
        if (this.state.show_form == true && index != this.props.index) {
            this.cancelShowForm();
        }
    },

    componentDidUpdate: function () {
        if ($(window).height() >= $(document.body).height()) {
            $('.main-block').css('height', $(window).height() - $('.footer-block').outerHeight() - $('.navbar-block').outerHeight());
        } else {
            $('.main-block').css('height', '');
        }
    },

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
        $('.main-block').css('height', '');

    },

    cancelShowForm: function () {
        this.setState({show_form: false, form: {health: dog.health.value}});
    },
    initChange: function (key, e) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },
    submitForm: function () {
        var data = this.state.form;
        console.log(data);
        this.setState({show_form: false});
    },
    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = React.createElement("form", null, 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.health.title, ":"), 
                    React.createElement("textarea", {name: "health", defaultValue: self.state.form.health, onChange: self.initChange.bind(self, 'health')})
                ), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("input", {type: "button", onClick: self.submitForm, value: "Save"}), 
                    React.createElement("input", {type: "button", onClick: self.cancelShowForm, value: "Cancel"})
                )
            )
        } else {
            content = React.createElement("div", null, 
                React.createElement("img", {src: "static/img/pencil.png", className: "edit-pet-button", onClick: self.changeShowForm}), 
                React.createElement("div", {className: "info-row"}, 
                    React.createElement("div", {className: "label"}, dog.health.title, ":"), 
            dog.health.value
                )
            )
        }
        return React.createElement("div", null, content)
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