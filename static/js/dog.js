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
    news: [{author: 'greenday', content: 'la la la lala la lala la lala la la', created_ar: '12.03.2012'},
        {author: 'greenday', content: 'bla la la lala la labla bla bla la labla  lala la la', created_ar: '12.03.2012'},
        {author: 'greenday', content: 'cla cla la lala la lacla bla cbla la lacla  lala cla la', created_ar: '12.03.2012'}]
};

var breeds = [
    {title: 'White Swiss Shepherd', value:'wss', url: ''},
    {title: 'German Shepherd', value:'gs', url: ''},
    {title: 'Golder Retriever', value:'gr', url: ''}];

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
        return <div className="navbar">
            <div className="container">
                <div className="logo">PetsTeRR</div>

            </div>
        </div>;
    }
});

var MainBlock = React.createClass({
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
            return <MenuChoiceBlock self={self} class={style} title={item} index={index} chooseMenu={self.chooseMenu}/>
        });
        var info_block = this.props.items.map(function (item, index) {
            var style = '';
            if (self.state.active == index) {
                style = 'show';
            }
            return <MenuInfoBlock class={style} text={index} index={index}/>
        });
        return <div className="main-block">
            <div className="image-cropper">
                <img className="dog-photo" src="static/img/P1110558.jpg" />
            </div>

            <div className="name-block">
                <div className="container">Nathan Drake Snow Avalanche | Nathan</div>
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
        return <li className={this.props.class} onClick={this.props.chooseMenu.bind(this.props.self, this.props.index)}>{this.props.title}</li>
    }
});

var MenuInfoBlock = React.createClass({
    render: function () {
        var text;
        if (this.props.text == 0) {
            text = 'Some news'
        }
        if (this.props.text == 1) {
            text = <InfoPetBlock />
        }
        if (this.props.text == 2) {
            text = <PedigreePetBlock />
        }
        if (this.props.text == 3) {
            text = <AchievementsPetBlock />
        }
        if (this.props.text == 4) {
            text = <HealthPetBlock />
        }
        return <div className={this.props.class} id={'tab_' + this.props.index} >{text}</div>
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
    componentWillUnmount: function () {
        this.setState({show_form: false});
    },

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
    },

    initChange: function (e, key) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },

    initSelectChange: function (key) {
        var new_form = this.state.form;
        var new_value = this.refs[key].getDOMNode().value;
        new_form[key] = new_value;
        this.setState({form: new_form});
        console.log(this.state.form);

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
                    <input type="button" value="Save"/>
                    <input type="button" onClick={self.changeShowForm} value="Cancel"/>
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

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
    },

    initChange: function (e, key) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },
    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.mother_name.title}:</div>
                    <input type="date" name="mother" id="id_mother" value={self.state.form.mother} onChange={self.initChange.bind(self, 'mother')}/>
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
                    <input type="button" value="Save"/>
                    <input type="button" onClick={self.changeShowForm} value="Cancel"/>
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

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
    },

    initChange: function (e, key) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },
    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.entitlements.title}:</div>
                    <textarea name="entitlements" onChange={self.initChange.bind(self, 'entitlements')}>{self.state.form.entitlements}</textarea>
                </div>
                <div className="info-row">
                    <div className="label">{dog.achievements.title}:</div>
                    <textarea name="achievements" onChange={self.initChange.bind(self, 'entitlements')}>{self.state.form.achievements}</textarea>
                </div>
                <div className="info-row">
                    <input type="button" value="Save"/>
                    <input type="button" onClick={self.changeShowForm} value="Cancel"/>
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

    changeShowForm: function () {
        this.setState({show_form: !this.state.show_form});
    },
    initChange: function (e, key) {
        var new_form = this.state.form;
        new_form[key] = e.target.value;
        this.setState({form: new_form});
    },
    render: function () {
        var self = this;
        var content;
        if (this.state.show_form) {
            content = <form>
                <div className="info-row">
                    <div className="label">{dog.health.title}:</div>
                    <textarea name="health" onChange={self.initChange.bind(self, 'health')}>{self.state.form.health}</textarea>
                </div>
                <div className="info-row">
                    <input type="button" value="Save"/>
                    <input type="button" onClick={self.changeShowForm} value="Cancel"/>
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