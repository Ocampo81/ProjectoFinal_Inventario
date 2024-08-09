"""empty message

Revision ID: b9d5baef7935
Revises: 010a6115b941
Create Date: 2024-07-30 15:52:33.640930

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9d5baef7935'
down_revision = '010a6115b941'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('addrNit', sa.Integer(), nullable=True))
        batch_op.drop_constraint('customer_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'address', ['addrNit'], ['nit'])
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('customer_id_fkey', 'address', ['id'], ['nit'])
        batch_op.drop_column('addrNit')

    # ### end Alembic commands ###