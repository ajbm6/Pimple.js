/**
 * Pimple tests
 * @copyright mparaiso <mparaiso@online.fr>
 */
var assert = require("assert");

describe('Pimple',function(){
    var Pimple = require('../pimple');
    var definitions = {
        param:"value",
        paramGetter:function(pimple){return pimple['param'];},
        paramGetter2:function(){return this.get('param');}
    }
    var container = new Pimple(definitions);
    it("should be instanciated properly",function(){
        assert.equal(container.param,definitions.param);
        assert.equal(container.get('param'),definitions.param);
        assert.equal(container.get('paramGetter'),definitions.param);
        assert.equal(container.get('paramGetter2'),definitions.param);
        assert.equal(container.paramGetter2,definitions.param);
    });
    it('raw should return service definition',function(){
        assert.ok(container.raw('paramGetter') instanceof Function);
        assert.ok(container.raw('paramGetter2') instanceof Function);
    });
    it('should support shared services',function(){
        container.set("shared",container.share(function(){
            return new Date();
        }));
        container.set("shared2",container.share(function(){
            return {
                param:this.param
            };
        }));
        assert.equal(container.shared,container.shared);
        assert.equal(container.shared2,container.shared2);
    });
    it("should support protected services",function(){
        container.set('protected',container.protect(function(){
            return this.param;
        }))
        assert.ok(container.protected instanceof Function);
        assert.equal(container.protected(),definitions.param);
    });
});