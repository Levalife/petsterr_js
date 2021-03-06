var dog = {
    photo: '',
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

var PageBlock = React.createClass({
    render: function () {
        return <div>
            <NavbarBlock />
            <MainBlock items={['News', 'Info', 'Pedigree', 'Achievements', 'Health']} />
            <FooterBlock />
        </div>;
    }
});

var NavbarBlock = React.createClass({
    render: function () {
        return <div className="navbar-block">
            <div className="container">
                <div className="logo">PetsTeRR</div>

            </div>
        </div>;
    }
});

var MainBlock = React.createClass({
    getInitialState: function () {
        return {active: 0, shown: 0, toggleMenu: false, acceptPhoto: false}
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

    toggleMenu: function () {
        this.setState({toggleMenu: !this.state.toggleMenu});
    },

    initAcceptPhotoChange: function () {
        this.setState({acceptPhoto: true});
    },

    initChoosePhoto: function () {
        $('#id_photo').click();
    },

    initPhotoChange: function (e) {
        var self = this;
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //$('#news-images-block').append('<div class="image-cropper"><img src="' + e.target.result + '"/></div>');
                //$('.dog-photo').attr('src', e.target.result);
                $('#dog-photo').attr('style', "background-image: url('" + e.target.result + "')");
                self.toggleMenu();
                self.initAcceptPhotoChange();
            };
            reader.readAsDataURL(e.target.files[0]);

        } else {
            self.cancelChangePhoto();
            this.setState({toggleMenu: !this.state.toggleMenu});
        }
    },

    cancelChangePhoto: function () {
        $('#dog-photo').attr('style', "background-image: url('" + dog.photo + "')");
        this.setState({acceptPhoto: false});
    },

    submitChangePhoto: function () {
        var form = this.refs.dog_photo_form.getDOMNode()[0];
        var data = new FormData(form);
        console.log(data);
        this.setState({acceptPhoto: false});

    },

    render: function () {
        var self = this;
        var menu_block = this.props.items.map(function (item, index) {
            var style = '';
            if (self.state.active == index) {
                style = 'active';
            }
            return <MenuChoiceBlock self={self} class={style} title={item} index={index} chooseMenu={self.chooseMenu}/>
        });
        var info_block = this.props.items.map(function (item, index) {
            var style = '';
            if (self.state.active == index) {
                style = 'show';
            }
            return <MenuInfoBlock class={style} index={index}/>
        });
        if (dog.photo.indexOf('media') > 0) {

        }
        var delete_choice = dog.photo.indexOf('media') > 0 ? <li>Delete</li> : '';
        var toggle_menu = self.state.toggleMenu ? <div className="toggle-menu-block">
            <ul>
                <li onClick={self.initChoosePhoto}>Upload</li>
                {delete_choice}
            </ul>
        </div> : '';

        var accept_panel = self.state.acceptPhoto ?
            <div className='change-photo-panel'>
                <div className="container">
                    <input type="button" value="Save" onClick={self.submitChangePhoto} />
                    <input type="button" value="Cancel" onClick={self.cancelChangePhoto}/>
                </div>
            </div> : '';

        return <div className="main-block">
            <div className="dog-image-block">
                <div className="container">
                    <img className="menu-toggle-button" onClick={self.toggleMenu} src="static/img/no_photo.png" />
                    {toggle_menu}
                </div>
                                {accept_panel}
                <div className="dog-photo" id="dog-photo" style={{'background-image': dog.photos}} ></div>
                <form ref="dog_photo_form">
                    <input type="file" name="photo" id="id_photo" onChange={self.initPhotoChange} />
                </form>
            </div>
            <div className="name-block">
                <div className="container">{dog.full_name.value} | {dog.home_name.value}</div>
            </div>
            <div className="container">
                <div className="content-block">
                    <div className="control-block">
                        <ul>
                    {menu_block}
                        </ul>
                    </div>
                    <div className="info-block">
                    {info_block}

                    </div>
                </div>
            </div>
        </div>;
    }
});

var MenuChoiceBlock = React.createClass({
    render: function () {
        return <li className={this.props.class} onClick={this.props.chooseMenu.bind(this.props.self, this.props.index)} data-index={this.props.index}> {this.props.title}</li>
    }
});

var MenuInfoBlock = React.createClass({
    render: function () {
        var text,
            self = this;
        if (this.props.index == 0) {
            text = <NewsBlock index={self.props.index} />
        }
        if (this.props.index == 1) {
            text = <InfoPetBlock index={self.props.index} />
        }
        if (this.props.index == 2) {
            text = <PedigreePetBlock index={self.props.index} />
        }
        if (this.props.index == 3) {
            text = <AchievementsPetBlock index={self.props.index} />
        }
        if (this.props.index == 4) {
            text = <HealthPetBlock index={self.props.index} />
        }
        return <div className={self.props.class} id={'tab_' + self.props.index} >{text}</div>
    }
});

var NewsBlock = React.createClass({
    render: function () {
        return <div>
            <NewsForm index={this.props.index}/>
            {dog.news.map(function (item) {
                return <NewsItemBlock item={item} />
            })}
        </div>;
    }
});

var NewsForm = React.createClass({
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
            buttons = this.state.buttons ? <div className="news-form-buttons">
                <div className="news-images-block" id="news-images-block"></div>
                <img className="photo-button" src="static/img/no_photo.png" onClick={this.initShowPhotos} />

                <input type="button" onClick={self.submitForm} value="Save"/>

            </div> : '',
            photos = this.state.photos ?
                <input type="file" id="id_photos" name="photos" multiple onChange={this.initImageChange} /> : '';
        return <form className="news-form-block" ref="news_form">
            <textarea name="content" id="id_content" value={self.state.content} onChange={self.initChange} onClick={self.initShowButtons}></textarea>
            {self.state.photos_img}
            {buttons}
            {photos}

        </form>
    }
});

var NewsItemBlock = React.createClass({
    render: function () {
        return <div className="news-item-block">
        {this.props.item.content}
            <div className="news-item-footer">
                <span className="created-at">{this.props.item.created_at}</span>
                <span className="author">{this.props.item.author}</span>
            </div>
        </div>
    }
});

var InfoPetBlock = React.createClass({
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
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.full_name.title}:</div>
                    <input type="text" name="full_name" id="id_full_name" value={self.state.form.full_name} onChange={self.initChange.bind(self, 'full_name')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.home_name.title}:</div>
                    <input type="text" name="home_name" id="id_home_name" value={self.state.form.home_name} onChange={self.initChange.bind(self, 'home_name')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.birthday.title}:</div>
                    <input type="date" name="birthday" id="id_birthday" value={self.state.form.birthday} onChange={self.initChange.bind(self, 'birthday')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.gender.title}:</div>
                    <select name="gender" ref="gender" id="id_gender" value={self.state.form.gender} onChange={self.initSelectChange.bind(self, 'gender')} >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="info-row">
                    <div className="label">{dog.kennel_of_live.title}:</div>
                    <input type="text" name="kennel_of_live" id="id_kennel_of_live" value={self.state.form.kennel_of_live} onChange={self.initChange.bind(self, 'kennel_of_live')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.breed.title}:</div>
                    <select name="breed" ref="breed" id="id_breed" value={self.state.form.breed} onChange={self.initSelectChange.bind(self, 'breed')}>
                    {breeds.map(function (item) {
                        return <OptionBlock item={item} />
                    })}
                    </select>
                </div>
                <div className="info-row">
                    <div className="label">{dog.color.title}:</div>
                    <input type="text" name="color" id="id_color" value={self.state.form.color} onChange={self.initChange.bind(self, 'color')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.height.title}:</div>
                    <input type="text" name="height" id="id_height" value={self.state.form.height} onChange={self.initChange.bind(self, 'height')}/>
                </div>
                <div className="info-row">
                    <input type="button" onClick={self.submitForm} value="Save"/>
                    <input type="button" onClick={self.cancelShowForm} value="Cancel"/>
                </div>
            </form>
        } else {
            content = <div>
                <img src="static/img/pencil.png" className="edit-pet-button" onClick={self.changeShowForm} />

                <div className="info-row">
                    <div className="label">{dog.birthday.title}:</div>
                    {dog.birthday.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.gender.title}:</div>
                    {dog.gender.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.kennel_of_live.title}:</div>
                    {dog.kennel_of_live.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.breed.title}:</div>
                    {dog.breed.value}
                </div>
                <div className="info-row">
                    <div className="label"> {dog.color.title}:</div>
                    {dog.color.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.height.title}:</div>
                    {dog.height.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.about.title}:</div>
                    {dog.about.value}
                </div>
            </div>
        }
        return <div>{content}</div>;
    }
});

var OptionBlock = React.createClass({
    render: function () {
        return <option value={this.props.item.value}>{this.props.item.title}</option>
    }
});

var PedigreePetBlock = React.createClass({
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
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.mother_name.title}:</div>
                    <input type="text" name="mother" id="id_mother" value={self.state.form.mother} onChange={self.initChange.bind(self, 'mother')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.father_name.title}:</div>
                    <input type="text" name="father" id="id_father" value={self.state.form.father} onChange={self.initChange.bind(self, 'father')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.kennel_of_birth.title}:</div>
                    <input type="text" name="kennel_of_birth" id="id_kennel_of_birth" value={self.state.form.kennel_of_birth} onChange={self.initChange.bind(self, 'kennel_of_birth')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.registry.title}:</div>
                    <input type="text" name="registry" id="id_registry" value={self.state.form.registry} onChange={self.initChange.bind(self, 'registry')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.tattoo.title}:</div>
                    <input type="text" name="tattoo" id="id_tattoo" value={self.state.form.tattoo} onChange={self.initChange.bind(self, 'tattoo')}/>
                </div>
                <div className="info-row">
                    <div className="label">{dog.microchip.title}:</div>
                    <input type="text" name="microchip" id="id_microchip" value={self.state.form.microchip} onChange={self.initChange.bind(self, 'microchip')}/>
                </div>
                <div className="info-row">
                    <input type="button" onClick={self.submitForm} value="Save"/>
                    <input type="button" onClick={self.cancelShowForm} value="Cancel"/>
                </div>
            </form>
        } else {
            content = <div>
                <img src="static/img/pencil.png" className="edit-pet-button" onClick={self.changeShowForm} />
                <div className="info-row">
                    <div className="label">{dog.mother_name.title}:</div>
            {dog.mother_name.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.father_name.title}:</div>
            {dog.father_name.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.kennel_of_birth.title}:</div>
            {dog.kennel_of_birth.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.registry.title}:</div>
            {dog.registry.value}
                </div>
                <div className="info-row">
                    <div className="label"> {dog.tattoo.title}:</div>
            {dog.tattoo.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.microchip.title}:</div>
            {dog.microchip.value}
                </div>
            </div>
        }
        return <div>{content}</div>
    }
});

var AchievementsPetBlock = React.createClass({
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
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.entitlements.title}:</div>
                    <textarea name="entitlements" onChange={self.initChange.bind(self, 'entitlements')} value={self.state.form.entitlements}></textarea>
                </div>
                <div className="info-row">
                    <div className="label">{dog.achievements.title}:</div>
                    <textarea name="achievements" onChange={self.initChange.bind(self, 'achievements')} value={self.state.form.achievements}></textarea>
                </div>
                <div className="info-row">
                    <input type="button" onClick={self.submitForm} value="Save"/>
                    <input type="button" onClick={self.cancelShowForm} value="Cancel"/>
                </div>
            </form>
        } else {
            content = <div>
                <img src="static/img/pencil.png" className="edit-pet-button" onClick={self.changeShowForm} />
                <div className="info-row">
                    <div className="label">{dog.entitlements.title}:</div>
            {dog.entitlements.value}
                </div>
                <div className="info-row">
                    <div className="label">{dog.achievements.title}:</div>
            {dog.achievements.value}
                </div>
            </div>
        }
        return <div>{content}</div>
    }
});

var HealthPetBlock = React.createClass({
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
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.health.title}:</div>
                    <textarea name="health" defaultValue={self.state.form.health} onChange={self.initChange.bind(self, 'health')}/>
                </div>
                <div className="info-row">
                    <input type="button" onClick={self.submitForm} value="Save"/>
                    <input type="button" onClick={self.cancelShowForm} value="Cancel"/>
                </div>
            </form>
        } else {
            content = <div>
                <img src="static/img/pencil.png" className="edit-pet-button" onClick={self.changeShowForm} />
                <div className="info-row">
                    <div className="label">{dog.health.title}:</div>
            {dog.health.value}
                </div>
            </div>
        }
        return <div>{content}</div>
    }
});

var FooterBlock = React.createClass({
    render: function () {
        return <div className="footer-block">
            <div className="container">footer</div>
        </div>;
    }
});

React.render(
    <PageBlock />,
    document.body
);