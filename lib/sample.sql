--name: getAllProducts


select * from products



--name: getAllBrands
select * from brands

where id = 200 and brand = :brand
