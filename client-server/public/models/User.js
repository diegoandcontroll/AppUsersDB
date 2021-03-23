class User{
     constructor(name, gender, birth,country, email, password, photo, admin){
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        
     }

     get id(){
        return this._id;
     }
     get register(){
        return this._register;
     }

     get name(){
         return this._name;
      }

     get gender(){
         return this._gender;
      }

      get birth(){
         return this._birth;
      }

      get country(){
         return this._country;
      }

      get email(){
         return this._email;
      }

      get password(){
         return this._password;
      }

      get photo(){
         return this._photo;
      }

      get admin(){
         return this._admin;
      }

      set register(register){
         this._register = register;
      }

      set name(name){
         this._name = name;
      }

      set gender(gender){
         this._gender = gender;
      }

      set birth(birth){
         this._birth = birth;
      }

      set country(country){
         this._country = country;
      }

      set email(email){
         this._email = email;
      }

      set password(password){
         this._password = password;
      }

      set photo(photo){
         this._photo = photo;
      }

      set admin(admin){
         this._admin = admin;
      }

      loadFromJson(json){
         for(let name in json){
            switch(name){
               case '_register':
                  this[name] = new Date(json[name]);
               break;

               default:
                  if(name.substring(0, 1) === '_') this[name] = json[name];

            }
            
         }
      }

      static getUsersStorage(){
         return Fetch.get('/users');
     }

     toJson(){
        let json = {};
        Object.keys(this).forEach(key => {
           if(this[key] != undefined) json[key] = this[key];
        });

        return json;
     }
      save(){
         return new Promise((resolve,reject) =>{
            let promise;

            if(this.id){
               promise = Fetch.put(`/users/${this.id}`, this.toJson());
            }else{
               promise = Fetch.post(`/users`, this.toJson());
            }
            
            promise.then(data =>{
               this.loadFromJson(data);
               resolve(this);

            }).catch(e =>{
               reject(e);
            });

         });
         
      }

      remove(){
         return Fetch.delete(`users/${this.id}`)
      }

      
      
}