var uzumaki = require('../src/uzumaki.js');

uzumaki.spawn(

	'Broker',

	{

		'COMPANIES' : {},
	
		'addCompany' : function(company, share_price){
	
			this.COMPANIES[company] = share_price;
	
		},
	
		'purchase' : function(company, max_price, quantity){

			if(!this.COMPANIES[company])
				return this.uz.r('COMPANY_NOT_FOUND', company);
			
			if(this.COMPANIES[company] > max_price)
				return this.uz.r('PRICE_OUT_OF_LIMIT');
	
			return this.uz.r('SHARES_PURCHASED', quantity, this.COMPANIES[company]);
	
		}

	}

);


uzumaki.send(

	'Broker.addCompany',

	['A', 10.5]

);

exports.test_return = {

	'broker' : function(test){

		uzumaki.send(

			'Broker.purchase',

			["A", 11, 100], 

			{

				'SHARES_PURCHASED' : function(quantity, price){

					test.ok(quantity == 100, 'Shares purchased correctly');
					test.ok(price == 10.5, 'Price of shares is correct too');
					test.done();
				}

			}

		);
	
	},

	'broker2' : function(test){

		uzumaki.send(

			'Broker.purchase',

			["B", 5, 1000],

			{

				'COMPANY_NOT_FOUND' : function(company){

					test.ok(company == 'B');
					test.done();
				}

			}
	
		)
	}

}
