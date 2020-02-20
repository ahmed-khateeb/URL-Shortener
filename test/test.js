process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Url = require('../models/url');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Urls', () => {
    /** when adding replica for testing ********
    // beforeEach((done) => {
    //     Url.remove({}, (err) => { 
    //        done();           
    //     });        
    // });
    
    ******************************/
  /*
  * Test the /POST route
  */
  describe('/POST URL', () => {
      it('it should not POST a book without pages field', (done) => {
          let body = {
              url: 'https://www.google.com/search?q=I+love+Anime&tbm=isch&ved=2ahUKEwj66Jz2wODnAhUM0oUKHZ31CGIQ2-cCegQIABAA&oq=I+love+Anime&gs_l=img.3..0l10.5668.9236..10038...2.0..0.188.1925.0j12......0....1..gws-wiz-img.....10..35i39j0i67j35i362i39.dZFmCbKJ_jM&ei=BK5OXvrWCoyklwSd66OQBg&bih=637&biw=1319#imgrc=FLuJNBq3vLs6gM'
          }
        chai.request(server)
            .post('/shortener')
            .send(body)
            .end((err, res) => {
                console.log(res)
                  res.should.have.status(200);
              done();
            });
      });

  });
});