# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):
    
    def forwards(self, orm):
        
        # Changing field 'InstServer.addr_type'
        db.alter_column('edumanage_instserver', 'addr_type', self.gf('django.db.models.fields.CharField')(max_length=16))
    
    
    def backwards(self, orm):
        
        # Changing field 'InstServer.addr_type'
        db.alter_column('edumanage_instserver', 'addr_type', self.gf('django.db.models.fields.PositiveIntegerField')(max_length=2))
    
    
    models = {
        'contenttypes.contenttype': {
            'Meta': {'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'edumanage.contact': {
            'Meta': {'object_name': 'Contact'},
            'email': ('django.db.models.fields.CharField', [], {'max_length': '80', 'db_column': "'contact_email'"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'db_column': "'contact_name'"}),
            'phone': ('django.db.models.fields.CharField', [], {'max_length': '80', 'db_column': "'contact_phone'"})
        },
        'edumanage.institution': {
            'Meta': {'object_name': 'Institution'},
            'ertype': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '1', 'db_column': "'type'"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'realmid': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.Realm']"})
        },
        'edumanage.institutioncontactpool': {
            'Meta': {'object_name': 'InstitutionContactPool'},
            'contact': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['edumanage.Contact']", 'unique': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'institution': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.Institution']"})
        },
        'edumanage.institutiondetails': {
            'Meta': {'object_name': 'InstitutionDetails'},
            'address_city': ('django.db.models.fields.CharField', [], {'max_length': '64'}),
            'address_street': ('django.db.models.fields.CharField', [], {'max_length': '96'}),
            'contact': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['edumanage.Contact']", 'symmetrical': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'institution': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['edumanage.Institution']", 'unique': 'True'}),
            'number_id': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '6', 'null': 'True', 'blank': 'True'}),
            'number_user': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '6', 'null': 'True', 'blank': 'True'}),
            'oper_name': ('django.db.models.fields.CharField', [], {'max_length': '24', 'null': 'True', 'blank': 'True'}),
            'ts': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'edumanage.instrealm': {
            'Meta': {'object_name': 'InstRealm'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instid': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.Institution']"}),
            'proxyto': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['edumanage.InstServer']", 'symmetrical': 'False'}),
            'realm': ('django.db.models.fields.CharField', [], {'max_length': '160'})
        },
        'edumanage.instrealmmon': {
            'Meta': {'unique_together': "(('realm', 'mon_type'),)", 'object_name': 'InstRealmMon'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mon_type': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'realm': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.InstRealm']"})
        },
        'edumanage.instserver': {
            'Meta': {'object_name': 'InstServer'},
            'acct_port': ('django.db.models.fields.PositiveIntegerField', [], {'default': '1813', 'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'addr_type': ('django.db.models.fields.CharField', [], {'default': "'ipv4'", 'max_length': '16'}),
            'auth_port': ('django.db.models.fields.PositiveIntegerField', [], {'default': '1812', 'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'ertype': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '1', 'db_column': "'type'"}),
            'host': ('django.db.models.fields.CharField', [], {'max_length': '80'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instid': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.Institution']"}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '80', 'null': 'True', 'blank': 'True'}),
            'proto': ('django.db.models.fields.CharField', [], {'default': "'radius'", 'max_length': '12'}),
            'secret': ('django.db.models.fields.CharField', [], {'max_length': '80'}),
            'status_server': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'}),
            'ts': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'edumanage.monlocalauthnparam': {
            'Meta': {'object_name': 'MonLocalAuthnParam'},
            'eap_method': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instrealmmonid': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['edumanage.InstRealmMon']", 'unique': 'True'}),
            'passwp': ('django.db.models.fields.CharField', [], {'max_length': '24', 'db_column': "'pass'"}),
            'phase2': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '24'})
        },
        'edumanage.monproxybackclient': {
            'Meta': {'object_name': 'MonProxybackClient'},
            'host': ('django.db.models.fields.CharField', [], {'max_length': '80'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instrealmmonid': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.InstRealmMon']"}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '80', 'null': 'True', 'blank': 'True'}),
            'proto': ('django.db.models.fields.CharField', [], {'max_length': '12'}),
            'secret': ('django.db.models.fields.CharField', [], {'max_length': '80'}),
            'status_server': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'}),
            'ts': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'edumanage.name_i18n': {
            'Meta': {'object_name': 'Name_i18n'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lang': ('django.db.models.fields.CharField', [], {'max_length': '5'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '80'}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'})
        },
        'edumanage.realm': {
            'Meta': {'object_name': 'Realm'},
            'address_city': ('django.db.models.fields.CharField', [], {'max_length': '24'}),
            'address_street': ('django.db.models.fields.CharField', [], {'max_length': '32'}),
            'contact': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['edumanage.Contact']", 'symmetrical': 'False'}),
            'country': ('django.db.models.fields.CharField', [], {'max_length': '2'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'stype': ('django.db.models.fields.PositiveIntegerField', [], {'default': '0', 'max_length': '1'}),
            'ts': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'edumanage.realmdata': {
            'Meta': {'object_name': 'RealmData'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'number_IdP': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '5'}),
            'number_IdPSP': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '5'}),
            'number_SP': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '5'}),
            'number_id': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '9'}),
            'number_inst': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '5'}),
            'number_user': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '9'}),
            'realmid': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['edumanage.Realm']", 'unique': 'True'}),
            'ts': ('django.db.models.fields.DateTimeField', [], {})
        },
        'edumanage.serviceloc': {
            'AP_no': ('django.db.models.fields.PositiveIntegerField', [], {'max_length': '3'}),
            'IPv6': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'}),
            'Meta': {'object_name': 'ServiceLoc'},
            'NAT': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'}),
            'SSID': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'address_city': ('django.db.models.fields.CharField', [], {'max_length': '64'}),
            'address_street': ('django.db.models.fields.CharField', [], {'max_length': '96'}),
            'contact': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': "orm['edumanage.Contact']", 'null': 'True', 'blank': 'True'}),
            'enc_level': ('edumanage.models.MultiSelectField', [], {'max_length': '64'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'institutionid': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['edumanage.Institution']"}),
            'latitude': ('django.db.models.fields.DecimalField', [], {'max_digits': '8', 'decimal_places': '6'}),
            'longitude': ('django.db.models.fields.DecimalField', [], {'max_digits': '8', 'decimal_places': '6'}),
            'port_restrict': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'}),
            'transp_proxy': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'}),
            'ts': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'wired': ('django.db.models.fields.BooleanField', [], {'default': 'False', 'blank': 'True'})
        },
        'edumanage.url_i18n': {
            'Meta': {'object_name': 'URL_i18n'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lang': ('django.db.models.fields.CharField', [], {'max_length': '5'}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'url': ('django.db.models.fields.CharField', [], {'max_length': '180', 'db_column': "'URL'"}),
            'urltype': ('django.db.models.fields.CharField', [], {'max_length': '10', 'db_column': "'type'"})
        }
    }
    
    complete_apps = ['edumanage']
