--name: getAllProducts

select * from products
where id=:id and name=:name


--name: getAllBrands
select * from brands

where id = 200 and brand = :brand
