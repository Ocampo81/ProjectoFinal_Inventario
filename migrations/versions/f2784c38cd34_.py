"""empty message

Revision ID: f2784c38cd34
Revises: 1160c70eba33
Create Date: 2024-08-23 22:04:05.019932

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f2784c38cd34'
down_revision = '1160c70eba33'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('products',
    sa.Column('id_prod', sa.Integer(), nullable=False),
    sa.Column('prodname', sa.String(length=60), nullable=False),
    sa.Column('brand', sa.String(length=100), nullable=False),
    sa.Column('salesPrice', sa.Integer(), nullable=False),
    sa.Column('stock', sa.Integer(), nullable=False),
    sa.Column('idCatProd', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['idCatProd'], ['categoryproduct.idCatProd'], ),
    sa.PrimaryKeyConstraint('id_prod'),
    sa.UniqueConstraint('prodname')
    )
    op.create_table('productentry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('cost_price', sa.Integer(), nullable=False),
    sa.Column('amount_Prev', sa.Integer(), nullable=False),
    sa.Column('salesPrice_prev', sa.Integer(), nullable=False),
    sa.Column('id_prod', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_prod'], ['products.id_prod'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sales',
    sa.Column('idSales', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('totalPrice', sa.Integer(), nullable=False),
    sa.Column('iduser', sa.Integer(), nullable=True),
    sa.Column('nit', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['iduser'], ['user.id'], ),
    sa.ForeignKeyConstraint(['nit'], ['customer.nit'], ),
    sa.PrimaryKeyConstraint('idSales')
    )
    op.create_table('detailsales',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('unitPrice', sa.Integer(), nullable=False),
    sa.Column('idSales', sa.Integer(), nullable=True),
    sa.Column('id_prod', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['idSales'], ['sales.idSales'], ),
    sa.ForeignKeyConstraint(['id_prod'], ['products.id_prod'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.VARCHAR(length=15),
               type_=sa.DateTime(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=15),
               nullable=False)

    op.drop_table('detailsales')
    op.drop_table('sales')
    op.drop_table('productentry')
    op.drop_table('products')
    # ### end Alembic commands ###