"""empty message

Revision ID: 7f9adba1782e
Revises: ace6d55d8433
Create Date: 2024-08-05 20:02:13.993498

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f9adba1782e'
down_revision = 'ace6d55d8433'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('detailsales', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id_prod', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'products', ['id_prod'], ['id_prod'])

    with op.batch_alter_table('sales', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.VARCHAR(length=15),
               type_=sa.DateTime(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sales', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=15),
               nullable=False)

    with op.batch_alter_table('detailsales', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('id_prod')

    # ### end Alembic commands ###